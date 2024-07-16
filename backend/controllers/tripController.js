const tripService = require('../services/tripService');

exports.createTrip = async (req, res) => {
    const { title, description, source, destination, startDate, endDate, price, agentId, capacity } = req.body;

    if(!title || !description || !source || !destination || !startDate || !endDate || !price || !agentId || !capacity){
      return res.status(400).json({msg: 'Please enter all the details!!'});
    }
    try {
      const tripData = { title, description, source, destination, startDate, endDate, price, agentId, capacity };
      const newTrip = await tripService.createTrip(tripData);
      res.status(201).json(newTrip);
    } catch (error) {
      console.error('Error while creating trip:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  };


exports.filterTrips = async (req, res) => {
  const { source, destination, startDate, endDate } = req.body;

  try {
    const trips = await tripService.filterTrips({ source, destination, startDate, endDate });
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error while filtering trips:", error.message);
    res.status(500).json({ message: error.message });
  }
};
