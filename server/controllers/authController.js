import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import { sendVerificationEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Enforce password strength: 8+ characters, alphanumeric, special character
    if (
      !password ||
      password.length < 8 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain letters, numbers, and at least one special character.",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.emailVerified) {
        return res.status(400).json({ message: "User already exists" });
      }

      // If user exists but is not verified, update user info and send a new OTP!
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.verificationOtp = otp;
      existingUser.verificationOtpExpiry = expiry;
      await existingUser.save();

      // Associate any past guest bookings with this user
      await Booking.update(
        { userId: existingUser.id },
        { where: { email, userId: null } },
      );

      // Send OTP email
      try {
        await sendVerificationEmail({ email: existingUser.email, name: existingUser.name, otp });
      } catch (err) {
        console.error("Failed to send verification email:", err);
        return res.status(500).json({
          message: "Failed to send verification email: " + (err.message || err),
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          },
        });
      }

      return res.status(200).json({
        message: "User details updated. Verify your email using OTP sent.",
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (emailVerified false until OTP verified)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationOtp: otp,
      verificationOtpExpiry: expiry,
    });

    // Associate any past guest bookings with this new user
    await Booking.update(
      { userId: user.id },
      { where: { email, userId: null } },
    );

    // Send OTP email
    try {
      await sendVerificationEmail({ email: user.email, name: user.name, otp });
    } catch (err) {
      console.error("Failed to send verification email:", err);
      return res.status(500).json({
        message: "Failed to send verification email: " + (err.message || err),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    res
      .status(201)
      .json({
        message: "User created. Verify your email using OTP sent.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Require email verification
    if (!user.emailVerified) {
      return res
        .status(401)
        .json({
          message:
            "Email not verified. Please verify using the OTP sent to your email.",
        });
    }

    // Associate any guest bookings that might have been made before login
    await Booking.update(
      { userId: user.id },
      { where: { email, userId: null } },
    );

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "supersecretjwtkey",
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationOtp = otp;
    user.verificationOtpExpiry = expiry;
    await user.save();

    try {
      await sendVerificationEmail({ email: user.email, name: user.name, otp });
    } catch (err) {
      console.error("Failed to send OTP email:", err);
      return res.status(500).json({ message: "Failed to send OTP email: " + (err.message || err) });
    }

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.verificationOtp || !user.verificationOtpExpiry) {
      return res.status(400).json({ message: "No OTP requested" });
    }

    const expiryTime = new Date(user.verificationOtpExpiry).getTime();
    if (Date.now() > expiryTime) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.verificationOtp.toString() !== otp.toString().trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.emailVerified = true;
    user.verificationOtp = null;
    user.verificationOtpExpiry = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
