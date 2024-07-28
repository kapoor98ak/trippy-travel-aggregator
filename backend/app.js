const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config/config');
const connectDB = require('./config/databaseConfig');
const routes = require('./routes');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Initialize Express app
const app = express();
app.use(cors());

// Middleware
app.use(express.json()); // For parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded payloads, with support for nested objects
app.use(cors(corsOptions));

// Routes
app.use('/api', cors(), routes);

// // Connect to database
// databaseConfig.connectDB();

app.listen(config.port, () => {
  console.log(`HELLO! Server running on port ${config.port}`);
});

module.exports = app;
