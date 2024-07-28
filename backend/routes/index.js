// routes/index.js
const express = require('express');
const router = express.Router();


const emailRoutes = require('./emailRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const tripRoutes = require('./tripRoutes');

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/trips', tripRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
