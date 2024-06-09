// routes/index.js
const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');

router.use('/email', emailRoutes);

module.exports = router;
