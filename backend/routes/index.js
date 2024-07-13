// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
// const userRoutes = require("./userRoutes");
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes')

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes)

module.exports = router;
