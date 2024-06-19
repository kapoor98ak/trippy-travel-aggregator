const authService = require('../services/authService');

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    address,
    agencyName,
    agencyBIN,
    agencyAddress,
  } = req.body;

  try {
    const token = await authService.registerUser({
      name,
      email,
      password,
      role,
      address,
      agencyName,
      agencyBIN,
      agencyAddress,
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
