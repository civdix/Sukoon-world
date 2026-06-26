import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import User from "./models/User.js";
import Booking from "./models/Booking.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

// Sync Database and start server
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use alter: true for dev
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// If running on Vercel, sync the database asynchronously on startup to ensure new columns are created
if (process.env.VERCEL) {
  sequelize.sync({ alter: true })
    .then(() => console.log("Database synced successfully on Vercel"))
    .catch((error) => console.error("Database sync failed on Vercel:", error));
} else {
  // Start the server normally for local development
  startServer();
}


// Export the Express app so Vercel can handle the routing and serverless invocation
export default app;
