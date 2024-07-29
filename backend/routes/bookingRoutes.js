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

// To Do: Add the auth Middle ware in this creation...
module.exports = router;
