const { query } = require('express');
const Booking = require('../models/Booking');

exports.getAllBookings = async(travelerId) => {
    try{
        const query = {}

        if(travelerId){
            query.travelerId = travelerId;
        }

        const userBookings = await Booking.find(query);

        return userBookings;
    } catch (err) {
        console.log("Error while fetching all the bookings for the customer...", err.message);
        throw new Error(err.message);
    } 
}
exports.createBooking = async(bookingData) => {
    try
    {
        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();
        return savedBooking;
        
    } catch (err) {
        console.log("Error while creating a booking...", err.message);
        throw new Error(err.message);
    }
};




// Get upcoming bookings for a traveler
exports.getUpcomingBookings = async (travelerId) => {
  try {
    const today = new Date();
    const upcomingBookings = await Booking.find({ travelerId: travelerId })
      .populate('tripId') // Populate trip details
      .then(bookings => bookings.filter(booking => new Date(booking.tripId.startDate) >= today));

    return upcomingBookings;
  } catch (error) {
    throw new Error('Unable to fetch upcoming bookings: ' + error.message);
  }
};

// Get past bookings for a traveler
exports.getPastBookings = async (travelerId) => {
  try {
    const today = new Date();
    const pastBookings = await Booking.find({ travelerId: travelerId })
      .populate('tripId') // Populate trip details
      .then(bookings => bookings.filter(booking => new Date(booking.tripId.startDate) < today));

    return pastBookings;
  } catch (error) {
    throw new Error('Unable to fetch past bookings: ' + error.message);
  }
};
