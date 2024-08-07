/*
Trip Service
We need to ensure that the trip can only be created by the Travel Agent.

If he is, then on the UI, it will be shown to him.
We can create a new Trip by taking new information from a travel agent.
We can edit an existing Trip by editing some fields.
We can delete a Trip.
*/

// services/tripService.js
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');
const User = require('../models/User');

const emailService = require('../services/emailService');

exports.getAllTrips = async () => {
  try {
    const allTrips = await Trip.find({});
    return allTrips;
  } catch (error) {
    console.log('Error while fetching all the trips...');
    throw new Error(error.message);
  }
};

exports.createTrip = async (tripData) => {
  try {
    const newTrip = new Trip(tripData);
    const savedTrip = await newTrip.save();
    console.log('Trip saved successfully:', savedTrip);

    // Fetch agent details
    const agent = await User.findById(savedTrip.agentId);

    // Send email notification to the agent
    const agentMailOptions = {
      to: agent.email,
      from: process.env.EMAIL_ADDRESS,
      subject: 'New Trip Assigned to You',
      text: `Hello ${agent.firstName},\n\nA new trip titled "${savedTrip.title}" has been created. Please check the trip details.\n\nBest Regards,\nTrippy`,
    };
    await emailService.sendEmail(agentMailOptions);
    return savedTrip;
  } catch (error) {
    console.error('Error while creating a trip:', error.message);
    throw new Error(error.message);
  }
};

exports.filterTrips = async ({ source, destination, startDate, endDate }) => {
  try {
    const query = {};

    if (source) {
      query.source = source;
    }

    if (destination) {
      query.destination = destination;
    }

    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    } else if (startDate) {
      query.startDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.endDate = { $lte: new Date(endDate) };
    }

    const trips = await Trip.find(query).populate('agentId', 'name email');
    return trips;
  } catch (error) {
    console.error('Error while filtering trips:', error.message);
    throw new Error(error.message);
  }
};



exports.getRequestedTrips = async (travelerId) => {
  console.log("Requested trips...");
  // Assuming there is a field in bookings to denote requested status
  return await Trip.find({
    'bookings.travelerId': travelerId,
    'bookings.status': 'requested',
  }).populate('bookings');
};



exports.getPastTrips = async (travelerId) => {
  console.log("Fetching past trips for traveler ID:", travelerId);
  const today = new Date();
  console.log("Today's date:", today);

  // Fetch all bookings for the traveler and populate trip details
  const bookings = await Booking.find({ travelerId }).populate('tripId');
  console.log("Bookings for traveler:", bookings);

  // Extract unique trip IDs from the bookings
  const tripIds = [...new Set(bookings.map(booking => booking.tripId._id))];
  console.log("Unique trip IDs:", tripIds);

  // Fetch trips with these IDs where endDate is in the past
  const pastTrips = await Trip.find({
    _id: { $in: tripIds },
    endDate: { $lt: today },
  });

  console.log("Past trips:", pastTrips);

  return pastTrips;
};

exports.getUpcomingTrips = async (travelerId) => {
  console.log("Fetching upcoming trips for traveler ID:", travelerId);
  const today = new Date();
  console.log("Today's date:", today);

  // Fetch all bookings for the traveler and populate trip details
  const bookings = await Booking.find({ travelerId }).populate('tripId');
  console.log("Bookings for traveler:", bookings);

  // Extract unique trip IDs from the bookings
  const tripIds = [...new Set(bookings.map(booking => booking.tripId._id))];
  console.log("Unique trip IDs:", tripIds);

  // Fetch trips with these IDs where startDate is in the future
  const upcomingTrips = await Trip.find({
    _id: { $in: tripIds },
    startDate: { $gte: today },
  });

  console.log("Upcoming trips:", upcomingTrips);

  return upcomingTrips;
};






