// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {

  console.log("In the AuthMiddleWare...")
  
  let token;
  token = req.header('Authorization').replace('Bearer ', ''); //Pleaes don't fucking remove the space from after the Bearer

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified...');
    const userId = decoded.user.id;  
    
    console.log('User authenticated - User ID:', userId);
   

    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.log('No user found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;

    req.body.user = decoded.id;
    console.log('Decoded User:', user);

    next();
  } catch (err) {
    console.log("Authorization Error:", err);
    res.status(401).json({ message: 'Token is not valid...'});
  }
};

module.exports = authMiddleware;
