const express = require('express');
const app = express();
const config = require('./config/config');
const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

module.exports = app;
