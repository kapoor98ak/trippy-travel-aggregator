const express = require("express")
const tripController = require('../controllers/tripController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

console.log("In the Routes, Index.js , Trips ...")

router.post('/create', authMiddleware, tripController.createTrip);
router.post('/filter', authMiddleware, tripController.filterTrips);


module.exports = router;