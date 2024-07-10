const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['traveler', 'agent', 'admin'],
    default: 'traveler',
  },
  agency_bin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: function () {
      return this.role === 'agent';
    },
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.role !== 'agent';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
