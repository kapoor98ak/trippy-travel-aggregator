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

module.exports = router;
