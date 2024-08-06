const express = require('express');
const tripController = require('../controllers/tripController');
const { authMiddleware } = require('../middleware/authMiddleware');
const uploadFilesAndConvertToBase64 = require('../middleware/uploadFilesAndConvertToBase64');
const router = express.Router();

router.get('/', tripController.getAllTrips);
router.post(
  '/create',
  authMiddleware,
  uploadFilesAndConvertToBase64,
  tripController.createTrip,
);
router.post('/filter', tripController.filterTrips);
router.get('/agent', authMiddleware, tripController.getTripsByAgent);
router.get('/:id', tripController.getTripById);
router.get('/traveler/trips', authMiddleware, tripController.getTravelerTrips);
router.put(
  '/:id',
  authMiddleware,
  uploadFilesAndConvertToBase64,
  tripController.editTrip,
);

router.put('/:id/reschedule', authMiddleware, tripController.rescheduleTrip);

router.put('/:id/cancel', authMiddleware, tripController.cancelTrip);

router.get('/agent//trips-summary',authMiddleware, tripController.getTripsSummary);

router.get('/agent/bookings-sumary', authMiddleware, tripController.getBookingsSummary);

router.get('/agent/average-trip-cost', authMiddleware, tripController.getAverageTripCost);

router.get('/agent/bookings-sumary/:year', authMiddleware, tripController.getBookingsSummaryByYear);

router.get('/agent/review-summary', authMiddleware, tripController.getReviewSummary);

module.exports = router;
