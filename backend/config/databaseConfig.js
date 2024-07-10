// config/databaseConfig.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uri = `mongodb+srv://${encodeURIComponent(process.env.MONGODB_USERNAME)}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@trippy-cluster-1.iohhmey.mongodb.net/?retryWrites=true&w=majority&appName=Trippy-Cluster-1`;
// JavaScript does not interpolate variables inside single-quoted strings. To solve this, you need to use template literals or string concatenation to dynamically construct the MongoDB URI with the environment variables.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      uri
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;