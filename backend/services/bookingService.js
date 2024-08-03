const { query } = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const emailService = require('../services/emailService');

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
        // Fetch traveler details
        const traveler = await User.findById(savedBooking.travelerId);

        // Send email notification to the traveler
        const mailOptions = {
        to: traveler.email,
        from: process.env.EMAIL_ADDRESS,
        subject: 'Booking Successful',
        text: `Hello ${traveler.firstName},\n\nYour booking was successful. Your booking ID is ${savedBooking._id}.\n\nBest Regards,\nTrippy`,
        };
        await emailService.sendEmail(mailOptions);
        return savedBooking;
    } catch (err) {
        console.log("Error while creating a booking...", err.message);
        throw new Error(err.message);
    }
};

exports.editBooking = async (bookingId, updateData) => {
    try {
        // Find the booking by ID and update the specified fields
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: updateData },
            { new: true } // Return the updated booking document
        );
        if (!updatedBooking) {
            throw new Error('Booking not found');
        }
        // Fetch traveler details
        const traveler = await User.findById(updatedBooking.travelerId);

        // Send email notification to the traveler  
        const mailOptions = {
        to: traveler.email,
        from: process.env.EMAIL_ADDRESS,
        subject: 'Booking Updated Successfully',
        text: `Hello ${traveler.firstName},\n\nYour booking has been updated successfully. Your booking ID is ${updatedBooking._id}.\n\nBest Regards,\nTrippy`,
        };
        await emailService.sendEmail(mailOptions);
        
        return updatedBooking;
    } catch (err) {
        console.log('Error while editing a booking...', err.message);
        throw new Error(err.message);
    }
  };