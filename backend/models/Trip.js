const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
});

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookedSlots: {
    type: Number,
    default: 0,
  },
  itinerary: [itinerarySchema],
  amenities: {
    wifi: { type: Boolean, default: false },
    meals: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    guide: { type: Boolean, default: false },
  },
  images: [String],
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'completed'],
    default: 'active',
  },
});

module.exports = mongoose.model('Trip', tripSchema);
