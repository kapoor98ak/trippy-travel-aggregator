const Review = require('../models/Review');

exports.createReview = async (reviewData) => {
  try {
    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();
    console.log('Review added successfully', savedReview);
    return savedReview;
  } catch (error) {
    console.error('Error while creating a review:', error.message);
    throw new Error(error.message);
  }
};

exports.getReviewsByTrip = async (tripId) => {
  try {
    const reviews = await Review.find({ tripId }).populate(
      'userId',
      'firstName lastName',
    );
    return reviews;
  } catch (error) {
    console.error('Error while fetching reviews:', error.message);
    throw new Error(error.message);
  }
};
