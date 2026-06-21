import express from 'express';
import { createBooking, verifyPayment, getMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow guests or logged in users to book. We won't protect this route, 
// but we will pass the token to check if user exists.
// We can use a custom middleware that doesn't enforce login but attaches user if token exists.
export const optionalAuth = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (token) {
    import('jsonwebtoken').then(jwt => {
      try {
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
        req.user = decoded;
        next();
      } catch (error) {
        next(); // Ignore error if token is invalid, treat as guest
      }
    });
  } else {
    next();
  }
};

router.post('/', optionalAuth, createBooking);
router.post('/verify', verifyPayment);
router.get('/my', protect, getMyBookings);

export default router;
