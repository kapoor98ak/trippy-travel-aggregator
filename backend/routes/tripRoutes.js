const express = require('express');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
    '/',
    tripController.getAllTrips
);

router.get(
    '/:id',
    tripController.getTrip
);

router.post(
  '/create',
  authMiddleware.authMiddleware,
  tripController.createTrip,
);

router.post(
    '/filter', 
    tripController.filterTrips
);



module.exports = router;
