const bookingService = require('../services/bookingService');

exports.getAllBookings = async (req, res) => {
    const travelerId = req.travelerId;
    const allBookings = await bookingService.getAllBookings(travelerId);
    res.status(200).json(allBookings);
  };

exports.bookTrip = async (req, res) => {
    const { 
        tripId, 
        travelerId,
        bookingDate,
        paymentStatus,
        totalAmount,
        travelerDetails,
    } = req.body;
    const bookingData = { 
        tripId, 
        travelerId,
        bookingDate,
        paymentStatus,
        totalAmount,
        travelerDetails, 
    };
    const booking = await bookingService.createBooking(bookingData);
    res.status(200).json(booking);
}


// Get upcoming bookings for a traveler
exports.getUpcomingBookings = async (req, res) => {
    try {
      const travelerId = req.params.travelerId;
      const upcomingBookings = await bookingService.getUpcomingBookings(travelerId);
      res.status(200).json(upcomingBookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get past bookings for a traveler
  exports.getPastBookings = async (req, res) => {
    try {
      const travelerId = req.params.travelerId;
      const pastBookings = await bookingService.getPastBookings(travelerId);
      res.status(200).json(pastBookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };