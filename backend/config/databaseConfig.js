// config/databaseConfig.js

const mongoose = require('mongoose');

const connect = () => {
  const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/trippyDB';

  mongoose.connect(dbUri)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
    process.exit();
  });
};

module.exports = {
  connect,
};
