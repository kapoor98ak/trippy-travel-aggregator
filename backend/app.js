const express = require('express');

const config = require('./config/config');
const databaseConfig = require('./config/databaseConfig');
const routes = require('./routes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Connect to database
databaseConfig.connect();

app.listen(config.port, () => {
    console.log(`HELLO! Server running on port ${config.port}`);
});

module.exports = app;
