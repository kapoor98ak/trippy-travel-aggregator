// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
const userRoutes = require('./userRoutes');

router.use('/email', emailRoutes);
router.use('/users', userRoutes);

module.exports = router;
