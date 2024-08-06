const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get(
    '/',
    authMiddleware.authMiddleware,
    bookingController.getAllBookings
);

router.post(
    '/create', 
    authMiddleware.authMiddleware,
    bookingController.bookTrip
);


// Route for getting upcoming bookings
router.get('/traveler/upcoming',authMiddleware.authMiddleware, bookingController.getUpcomingBookings);

// Route for getting past bookings
router.get('/traveler/past',authMiddleware.authMiddleware, bookingController.getPastBookings);

// To Do: Add the auth Middle ware in this creation...
// Edit booking route
router.put(
    '/:id', 
    authMiddleware.authMiddleware,
    bookingController.editBooking
);

module.exports = router;


