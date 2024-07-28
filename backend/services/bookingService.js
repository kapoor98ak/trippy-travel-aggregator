const { query } = require('express');
const Booking = require('../models/Booking');

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
        return savedBooking;
        
    } catch (err) {
        console.log("Error while creating a booking...", err.message);
        throw new Error(err.message);
    }
};
