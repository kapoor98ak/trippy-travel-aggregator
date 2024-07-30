const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('Authorization Error:', err);
    res.status(401).json({ message: 'Token is not valid...' });
  }
};

const verifyAdmin = async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};

module.exports = {
  authMiddleware,
  verifyAdmin,
};
