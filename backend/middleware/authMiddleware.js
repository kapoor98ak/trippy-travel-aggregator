// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  token = token.replace('Bearer ', '');

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    console.log('User ID:', userId);
    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.log('No user found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    req.body.user = decoded.id;
    console.log('User:', user);
    next();
  } catch (err) {
    console.log('Authorization Error:', err);
    res.status(401).json({ message: 'Token is not valid...' });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  await exports.authMiddleware(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};
