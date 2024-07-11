const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/s');

exports.registerUser = async ({ name, email, password, role, agency_bin}) => {
  try {

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    console.log("Registering a User...")

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      passwordHash,
      role: role === 'agent' ? 'agent' : 'traveler',
      agency_bin: role === 'agent' ? agency_bin : null,
      isApproved: role !== 'agent',
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Create JWT token
    const payload = {
      user: {
        id: savedUser.id,
        role: savedUser.role,
        isApproved: savedUser.isApproved,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    
    return { user: savedUser, token };
  } catch (err) {
    console.log("Error while registering user...")
    console.error(err.message);
    throw new Error('Server error');
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        isApproved: user.isApproved,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

    return { user, token };
  } catch (error) {
    console.error("Error while logging in user:", error.message);
    throw new Error('Server error'); // Throw error to be handled in the controller
  }
};