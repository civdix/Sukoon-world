import express from 'express';
import { getAllBookings, updateBookingStatus, getAllUsers } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin); // Apply protect and admin middlewares to all admin routes

router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);
router.get('/users', getAllUsers);

export default router;
