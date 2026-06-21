import Booking from "../models/Booking.js";
import User from "../models/User.js";

// @desc    Get all bookings
// @route   GET /api/admin/bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const nextStatus = req.body?.status || booking.status;

    // Prevent marking session as completed unless payment is settled and booking is confirmed.
    if (nextStatus === "completed" && booking.status !== "confirmed") {
      return res
        .status(400)
        .json({
          message: "Only confirmed bookings can be marked as completed",
        });
    }

    // Prevent manual confirmation for paid bookings that have no verified payment id.
    if (
      nextStatus === "confirmed" &&
      booking.amount > 0 &&
      !booking.razorpayPaymentId
    ) {
      return res
        .status(400)
        .json({
          message:
            "Paid booking cannot be confirmed without successful payment verification",
        });
    }

    booking.status = nextStatus;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
