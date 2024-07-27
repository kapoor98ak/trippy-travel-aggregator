const tripService = require('../services/tripService');

// tripController.js


exports.createTrip = async (req, res) => {
  const { title, source, destination, startDate, endDate, price,  itinerary, amenities, images } = req.body;
  const capacity=req.body.occupancy;


 
  


  if (!title || !source || !destination || !startDate || !endDate || !price || !capacity || !itinerary || !images) {
    console.log('Missing required fields');
    return res.status(400).json({ msg: 'Please enter all the details!!' });
  }

  if (req.user.role !== 'agent') {
    console.log('Unauthorized access attempt by:', req.user.email);
    return res.status(403).json({ msg: 'Unauthorized: Only agents can create trips.' });
  }
  const agentId = req.user._id;

  try {
    const tripData = {
      title,
      source,
      destination,
      startDate,
      endDate,
      price,
      capacity,
      itinerary,
      amenities,
      images,
      agentId
    };

    console.log("Calling tripService.createTrip with data:", tripData);
    const newTrip = await tripService.createTrip(tripData);
    console.log("Trip created successfully:", newTrip);

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
