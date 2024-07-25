const express = require("express")
const tripController = require('../controllers/tripController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/create',authMiddleware, tripController.createTrip);
router.post('/filter', tripController.filterTrips);


module.exports = router;