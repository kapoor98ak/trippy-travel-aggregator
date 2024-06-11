const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    source: String,
    destination: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'canceled', 'completed'], default: 'active' },
    capacity: Number,
    bookedSlots: { type: Number, default: 0 },

    // TODO: Add a list of people who are going on that trip.
    // TODO: How do you make joins in MongoDB.
});

module.exports = mongoose.model('Trip', tripSchema)