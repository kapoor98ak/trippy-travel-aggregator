const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, reviewController.createReview);

router.get('/:tripId', reviewController.getReviewsByTrip);

module.exports = router;
