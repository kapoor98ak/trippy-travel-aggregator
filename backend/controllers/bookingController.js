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

exports.editBooking = async (req, res) => {
    const bookingId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedBooking = await bookingService.editBooking(bookingId, updateData);
      res.status(200).json(updatedBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };