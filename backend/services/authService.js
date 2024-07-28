const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agency = require('../models/Agency');

exports.registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  agency_bin,
  agency_name,
  agency_address,
}) => {
  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      throw new Error('User already exists');
    }
    console.log('Registering a User...');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let agency = null;
    if (role === 'agent') {
      // Check if the Agency exists
      agency = await Agency.findOne({ binNumber: agency_bin });
      if (!agency) {
        // Create a new Agency
        const newAgency = new Agency({
          binNumber: agency_bin,
          name: agency_name,
          address: agency_address,
        });
        agency = await newAgency.save();
      }
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      agency: agency ? agency._id : null,
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

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // 1 hour token expiration
    });

    return { user: savedUser, token };
  } catch (err) {
    console.log('Error while registering user...');
    console.error(err.message);
    throw new Error('Server error');
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
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

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // 1 hour token expiration
    });

    return { user, token };
  } catch (error) {
    console.error('Error while logging in user:', error.message);
    throw new Error('Server error'); // Throw error to be handled in the controller
  }
};
