// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const tripRoutes = require('./tripRoutes');
const bookingRoutes = require('./bookingRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');
const travelRequestRoutes = require("./travelRequestsRoutes")

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/trips', tripRoutes);
router.use('/booking', bookingRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);
router.use('/travelrequests', travelRequestRoutes);

module.exports = router;
