const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/databaseConfig');
const routes = require('./routes');
const bodyParser = require('body-parser');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded payloads, with support for nested objects

// Routes
app.use('/api', routes);

app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`HELLO! Server running on port ${config.port}`);
});

module.exports = app;
