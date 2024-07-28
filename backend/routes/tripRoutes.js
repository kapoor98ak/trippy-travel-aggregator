const express = require("express")
const tripController = require('../controllers/tripController')
const authMiddleware = require('../middleware/authMiddleware')
const uploadFilesAndConvertToBase64 = require('../middleware/uploadFilesAndConvertToBase64')

const router = express.Router();

router.post('/create',uploadFilesAndConvertToBase64,authMiddleware,tripController.createTrip);
router.post('/filter', tripController.filterTrips);

router.get('/', authMiddleware,tripController.getTripsByAgent);

router.get('/:id', authMiddleware, tripController.getTripById);

router.put('/:id', uploadFilesAndConvertToBase64, authMiddleware, tripController.updateTrip);



module.exports = router;