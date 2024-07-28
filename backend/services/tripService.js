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

exports.getAllTrips = async() => {
  try{
    const allTrips = await Trip.find({});
    return allTrips;
  } catch (error) {
    console.log("Error while fetching all the trips...");
    throw new Error(error.message);
  }
};

exports.createTrip = async (tripData) => {
  try {
    const newTrip = new Trip(tripData);
    const savedTrip = await newTrip.save();
    return savedTrip;
  } catch (error) {
    console.error('Error while creating a trip:', error.message);
    throw new Error(error.message);
  }
};

exports.getTrip = async(id) => {
  try {
    const query = {};
    if (id) {
      query._id = id;
      const trip = await Trip.findById(query);
      return trip;
    }
  } catch (error) {
    console.error('Error while fetching trip...', error.message);
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