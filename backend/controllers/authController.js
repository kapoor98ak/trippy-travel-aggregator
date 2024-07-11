const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, password, role, agency_bin } = req.body;

  try {
    const { user, token } = await authService.registerUser({ name, email, password, role, agency_bin });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in loginUser controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};
