const express = require("express")
const tripController = require('../controllers/tripController')

const router = express.Router();

router.post('/create', tripController.createTrip);
router.post('/filter', tripController.filterTrips);


module.exports = router;