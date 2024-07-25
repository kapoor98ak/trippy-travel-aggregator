// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;
  token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
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
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
