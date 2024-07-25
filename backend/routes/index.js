// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
// const userRoutes = require("./userRoutes");
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);

module.exports = router;
