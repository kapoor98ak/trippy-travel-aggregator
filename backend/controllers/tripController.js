const tripService = require('../services/tripService');
const Trip = require('../models/Trip');

exports.getAllTrips = async (req, res) => {
  const allTrips = await tripService.getAllTrips();
  res.status(200).json(allTrips);
};

exports.getTrip = async (req, res) => {
  id = req.params.id;
  const requestedTrip = await tripService.getTrip(id);
  res.status(200).json(requestedTrip);
};

exports.createTrip = async (req, res) => {
  const { title, source, destination, startDate, endDate, price, images } =
    req.body;
  const capacity = req.body.occupancy;
  let amenities;
  let itinerary;

  try {
    amenities = JSON.parse(req.body.amenities);
    itinerary = JSON.parse(req.body.itinerary);
  } catch (error) {
    console.error('Error parsing amenities or itinerary:', error);
    return res
      .status(400)
      .json({ msg: 'Invalid amenities or itinerary format' });
  }

  if (
    !title ||
    !source ||
    !destination ||
    !startDate ||
    !endDate ||
    !price ||
    !capacity ||
    !itinerary ||
    !images ||
    !amenities
  ) {
    console.log('Missing required fields');
    return res.status(400).json({ msg: 'Please enter all the details!!' });
  }

  if (req.user.role !== 'agent') {
    console.log('Unauthorized access attempt by:', req.user.email);
    return res
      .status(403)
      .json({ msg: 'Unauthorized: Only agents can create trips.' });
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
      agentId,
    };

    console.log('Calling tripService.createTrip with data:', tripData);
    const newTrip = await tripService.createTrip(tripData);
    console.log('Trip created successfully:', newTrip);
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error while creating trip:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTripsByAgent = async (req, res) => {
  try {
    const agentId = req.user._id;

    const trips = await Trip.find({ agentId });

    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by agent:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error fetching trip details:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.editTrip = async (req, res) => {
  const tripId = req.params.id;
  const { title, source, destination, startDate, endDate, price, images } =
    req.body;
  const capacity = req.body.occupancy;
  let amenities;
  let itinerary;

  try {
    amenities = JSON.parse(req.body.amenities);
    itinerary = JSON.parse(req.body.itinerary);
  } catch (error) {
    console.error('Error parsing amenities or itinerary:', error);
    return res
      .status(400)
      .json({ msg: 'Invalid amenities or itinerary format' });
  }

  if (
    !title ||
    !source ||
    !destination ||
    !startDate ||
    !endDate ||
    !price ||
    !capacity ||
    !itinerary ||
    !images ||
    !amenities
  ) {
    console.log('Missing required fields');
    return res.status(400).json({ msg: 'Please enter all the details!!' });
  }

  if (req.user.role !== 'agent') {
    console.log('Unauthorized access attempt by:', req.user.email);
    return res
      .status(403)
      .json({ msg: 'Unauthorized: Only agents can edit trips.' });
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
      agentId,
    };

    console.log('Calling Trip.findByIdAndUpdate with data:', tripData);
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, tripData, {
      new: true,
    });

    if (!updatedTrip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    console.log('Trip updated successfully:', updatedTrip);
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error while updating trip:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.filterTrips = async (req, res) => {
  const { source, destination, startDate, endDate } = req.body;

  try {
    const trips = await tripService.filterTrips({
      source,
      destination,
      startDate,
      endDate,
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error while filtering trips:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getTravelerTrips = async (req, res) => {
  try {
    const travelerId = req.user._id; // Ensure the user is authenticated
    const pastTrips = await tripService.getPastTrips(travelerId);
    const upcomingTrips = await tripService.getUpcomingTrips(travelerId);
    const requestedTrips = await tripService.getRequestedTrips(travelerId);

    res.json({
      pastTrips,
      upcomingTrips,
      requestedTrips
    });
  } catch (error) {
    console.error('Error fetching trips for traveler:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.rescheduleTrip = async (req, res) => {
  const { startDate, endDate } = req.body;
  const { id } = req.params;

  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ msg: 'Start date cannot be later than end date.' });
  }

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found.' });
    }

    trip.startDate = startDate;
    trip.endDate = endDate;
    await trip.save();

    res.status(200).json({ msg: 'Trip rescheduled successfully.' });
  } catch (error) {
    console.error('Error rescheduling trip:', error);
    res.status(500).json({ msg: 'Server error.' });
  }
};

exports.cancelTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found.' });
    }

    trip.status = 'canceled';
    await trip.save();

    res.status(200).json({ msg: 'Trip canceled successfully.' });
  } catch (error) {
    console.error('Error canceling trip:', error);
    res.status(500).json({ msg: 'Server error.' });
  }
};
