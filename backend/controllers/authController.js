const authService = require('../services/authService');

exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    agency_bin,
    agency_name,
    agency_address,
  } = req.body;

  try {
    const { user, token } = await authService.registerUser({
      firstName,
      lastName,
      email,
      password,
      role,
      agency_bin,
      agency_name,
      agency_address,
    });
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
    console.error('Error in loginUser controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getUser controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};
