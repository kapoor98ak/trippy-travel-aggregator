const jwt = require('jsonwebtoken');

const generateToken = (id, exp) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
};

module.exports = {
  generateToken,
};
