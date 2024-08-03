const express = require('express');
const router = express.Router();
const googleMapsController = require('../controllers/googleMapsController');

router.get('/coordinates', googleMapsController.getCoordinates);

module.exports = router;
