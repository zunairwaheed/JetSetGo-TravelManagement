import express from 'express';
import authRoute from './auth.js';
import tourRoute from './tours.js';
import bookingRoute from './booking.js';
import userRoute from './users.js';
import galleryRoute from './gallery.js';
<<<<<<< HEAD
=======
import testimonialRoute from './testimonials.js';
>>>>>>> cd83868 (Api's Integration)

const router = express.Router();

// Mount the route files under their corresponding paths
router.use('/auth', authRoute);
router.use('/tours', tourRoute);
router.use('/bookings', bookingRoute);
router.use('/users', userRoute);
router.use('/gallery', galleryRoute);
<<<<<<< HEAD
=======
router.use('/testimonials', testimonialRoute);
>>>>>>> cd83868 (Api's Integration)

export default router;
