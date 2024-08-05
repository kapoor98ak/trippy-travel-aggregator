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

exports.getPastTrips = async (travelerId) => {
  const today = new Date();
  return await Trip.find({
    'bookings.travelerId': travelerId,
    endDate: { $lt: today },
  }).populate('bookings');
};

exports.getUpcomingTrips = async (travelerId) => {
  const today = new Date();
  return await Trip.find({
    'bookings.travelerId': travelerId,
    startDate: { $gte: today },
  }).populate('bookings');
};

exports.getRequestedTrips = async (travelerId) => {
  // Assuming there is a field in bookings to denote requested status
  return await Trip.find({
    'bookings.travelerId': travelerId,
    'bookings.status': 'requested',
  }).populate('bookings');
};
