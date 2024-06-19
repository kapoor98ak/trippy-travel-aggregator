const express = require('express');
const dotenv = require('dotenv');
const config = require('./config/config');
const connectDB = require('./config/databaseConfig');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded payloads, with support for nested objects

// Routes
app.use('/api', routes);

// // Connect to database
// databaseConfig.connectDB();

app.listen(config.port, () => {
  console.log(`HELLO! Server running on port ${config.port}`);
});

module.exports = app;
