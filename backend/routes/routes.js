import express from 'express';
import authRoute from './auth.js';
import tourRoute from './tours.js';
import bookingRoute from './booking.js';
import userRoute from './users.js';

const router = express.Router();

// Mount the route files under their corresponding paths
router.use('/auth', authRoute);
router.use('/tours', tourRoute);
router.use('/bookings', bookingRoute);
router.use('/users', userRoute);

export default router;
