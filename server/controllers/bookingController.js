import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import { sendBookingConfirmationEmail } from "../services/emailService.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "dummy_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
});

const SESSION_PRICES_IN_PAISE = {
  "Discovery Call (30 min)": 0,
  "Counselling Session (60 min)": 39900,
  "Stress Management (45 min)": 29900,
  "Mindfulness Coaching (45 min)": 24900,
  "Relationship Counselling (60 min)": 49900,
  "Anxiety Management (45 min)": 29900,
  Testing: 200,
};

// @desc    Create a booking and a Razorpay order
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      sessionType,
      date,
      time,
      amount,
      notes,
      counsellorId,
      counsellorName,
      counsellorEmail,
      meetLink,
    } = req.body || {};
    const userId = req.user ? req.user.id : null;

    if (
      !Object.prototype.hasOwnProperty.call(
        SESSION_PRICES_IN_PAISE,
        sessionType,
      )
    ) {
      return res.status(400).json({ message: "Invalid session type" });
    }

    const expectedAmount = SESSION_PRICES_IN_PAISE[sessionType];
    if (Number(amount) !== expectedAmount) {
      return res
        .status(400)
        .json({ message: "Invalid amount for selected session" });
    }

    if (expectedAmount > 0 && !userId) {
      return res
        .status(401)
        .json({ message: "Please log in to book a paid session" });
    }

    // Require authentication for free sessions (discovery)
    if (expectedAmount === 0 && !userId) {
      return res
        .status(401)
        .json({ message: "Please log in to book a free discovery call" });
    }

    // 1. Check if user already has a free booking (only limit free sessions)
    if (expectedAmount === 0 && userId) {
      const existingBooking = await Booking.findOne({
        where: { userId, amount: 0 },
      });

      if (existingBooking && existingBooking.status !== "cancelled") {
        return res
          .status(400)
          .json({ message: "You have already used your 1 free session." });
      }
    }

    // 2. Create Razorpay order (only if amount > 0)
    let orderId = null;
    if (expectedAmount > 0) {
      const options = {
        amount: expectedAmount, // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      if (!order) {
        return res
          .status(500)
          .json({ message: "Failed to create Razorpay order" });
      }
      orderId = order.id;
    }

    // 3. Save pending booking in DB
    const booking = await Booking.create({
      userId,
      name,
      email,
      phone,
      sessionType,
      date,
      time,
      amount: expectedAmount,
      notes,
      counsellorId,
      counsellorName,
      counsellorEmail,
      meetLink,
      razorpayOrderId: orderId,
      status: expectedAmount > 0 ? "pending" : "confirmed",
    });

    // If amount is 0, we can also trigger email instantly since it's confirmed
    if (expectedAmount === 0) {
      import("../services/emailService.js").then(
        ({ sendBookingConfirmationEmail }) => {
          sendBookingConfirmationEmail({
            email: booking.email,
            name: booking.name,
            sessionType: booking.sessionType,
            date: booking.date,
            time: booking.time,
            amount: booking.amount,
            phone: booking.phone,
            notes: booking.notes,
            meetLink: booking.meetLink,
            hostName: booking.counsellorName,
            hostEmail: booking.counsellorEmail,
          }).catch((err) => console.error("Email error on free booking:", err));
        },
      );
    }

    res.status(201).json({
      message: "Booking initialized",
      orderId: orderId,
      amount: expectedAmount,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/bookings/verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return res
        .status(400)
        .json({ message: "Missing payment verification details" });
    }

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.amount <= 0) {
      return res
        .status(400)
        .json({ message: "No payment required for this booking" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Booking is not awaiting payment" });
    }

    if (
      !booking.razorpayOrderId ||
      booking.razorpayOrderId !== razorpay_order_id
    ) {
      return res
        .status(400)
        .json({ message: "Order mismatch for this booking" });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "dummy_secret")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is successful
      booking.status = "confirmed";
      booking.razorpayPaymentId = razorpay_payment_id;
      await booking.save();

      // Send email
      await sendBookingConfirmationEmail({
        email: booking.email,
        name: booking.name,
        sessionType: booking.sessionType,
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        phone: booking.phone,
        notes: booking.notes,
        meetLink: booking.meetLink,
        hostName: booking.counsellorName,
        hostEmail: booking.counsellorEmail,
      });

      res
        .status(200)
        .json({ message: "Payment verified successfully", booking });
    } else {
      res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized, please log in again" });
    }
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
