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

// Edit booking route
router.put(
    '/:id', 
    authMiddleware.authMiddleware,
    bookingController.editBooking
);

module.exports = router;
