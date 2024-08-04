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
      console.log("Trip saved successfully:", savedTrip);
      return savedTrip;
  } catch (error) {
      console.error("Error while creating a trip:", error.message);
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


// exports.getRequestedTrips = async (travelerId) => {
//   // Assuming there is a field in bookings to denote requested status
//   return await Trip.find({
//     "bookings.travelerId": travelerId,
//     "bookings.status": "requested"
//   }).populate('bookings');
// };

exports.getPastTrips = async (travelerId) => {
  const today = new Date();
  try {
    return await Trip.find({
      bookings: {
        $elemMatch: { travelerId, status: 'confirmed' }
      },
      endDate: { $lt: today }
    }).populate('bookings');
  } catch (error) {
    console.error('Error fetching past trips:', error.message);
    throw new Error('Error fetching past trips');
  }
};

exports.getUpcomingTrips = async (travelerId) => {
  const today = new Date();
  try {
    return await Trip.find({
      bookings: {
        $elemMatch: { travelerId, status: 'confirmed' }
      },
      startDate: { $gte: today }
    }).populate('bookings');
  } catch (error) {
    console.error('Error fetching upcoming trips:', error.message);
    throw new Error('Error fetching upcoming trips');
  }
};

exports.getRequestedTrips = async (travelerId) => {
  try {
    return await Trip.find({
      bookings: {
        $elemMatch: { travelerId, status: 'requested' }
      }
    }).populate('bookings');
  } catch (error) {
    console.error('Error fetching requested trips:', error.message);
    throw new Error('Error fetching requested trips');
  }
};

