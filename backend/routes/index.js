// routes/index.js
const express = require('express');
const router = express.Router();


const emailRoutes = require('./emailRoutes');
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');

console.log("In the Routes, Index.js ...")

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);

module.exports = router;
