const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  travelerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  totalAmount: Number,
  travelerDetails: [{
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    emergencyContact: {
      name: String,
      phone: String,
    },
  }],
});

module.exports = mongoose.model('Booking', bookingSchema);
