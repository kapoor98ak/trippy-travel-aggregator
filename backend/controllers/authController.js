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
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser({ email, password });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
