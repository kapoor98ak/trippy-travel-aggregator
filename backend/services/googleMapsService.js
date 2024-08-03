// services/googleMapsService.js
const { Client } = require('@googlemaps/google-maps-services-js');
require('dotenv').config();

const client = new Client({});

const getGeocode = async (address) => {
  try {
    const response = await client.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    });
    return response.data.results;
  } catch (error) {
    throw new Error(`Geocoding error: ${error.message}`);
  }
};

module.exports = { getGeocode };
