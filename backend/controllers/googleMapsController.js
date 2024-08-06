// controllers/googleMapsController.js
const googleMapsService = require('../services/googleMapsService');

exports.getCoordinates = async (req, res) => {
  const { address } = req.query; // or use req.body if you're posting data

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const results = await googleMapsService.getGeocode(address);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }
    const location = results[0].geometry.location;
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
