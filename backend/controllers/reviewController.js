const reviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
  const { tripId, rating, comment } = req.body;
  const userId = req.user._id;

  if (!tripId || !rating || !comment) {
    console.log('Missing required fields');
    return res.status(400).json({ msg: 'Please enter all the details!!' });
  }

  try {
    const reviewData = { tripId, userId, rating, comment };
    const newReview = await reviewService.createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error while creating review:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getReviewsByTrip = async (req, res) => {
  const tripId = req.params.tripId;

  try {
    const reviews = await reviewService.getReviewsByTrip(tripId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error while fetching reviews:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
