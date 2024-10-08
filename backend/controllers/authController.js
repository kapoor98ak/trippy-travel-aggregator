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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await authService.forgotPassword(email);
    res.status(200).json({ message: response });
  } catch (error) {
    console.error('Error in forgotPassword controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const response = await authService.resetPassword(token, newPassword);
    res.status(200).json({ message: response });
  } catch (error) {
    console.error('Error in resetPassword controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};
