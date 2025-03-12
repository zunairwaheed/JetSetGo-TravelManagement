import express from 'express';
import authRoute from './auth.js';
import tourRoute from './tours.js';
import bookingRoute from './booking.js';
import userRoute from './users.js';
import galleryRoute from './gallery.js';
import testimonialRoute from './testimonials.js';
import newsletterRoute from './newsletter.js'
import paymentRoute from './payment.js'

const router = express.Router();

router.use('/auth', authRoute);
router.use('/tours', tourRoute);
router.use('/bookings', bookingRoute);
router.use('/users', userRoute);
router.use('/gallery', galleryRoute);
router.use('/newsletter', newsletterRoute);
router.use('/testimonials', testimonialRoute);
router.use("/payments", paymentRoute);

export default router;
