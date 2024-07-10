// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
// const userRoutes = require("./userRoutes");
const authRoutes = require('./authRoutes');

router.use('/email', emailRoutes);
router.use('/auth', authRoutes);

module.exports = router;
