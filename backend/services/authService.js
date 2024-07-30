const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agency = require('../models/Agency');
const crypto = require('crypto');
const emailService = require('../services/emailService');
const nodemailer = require('nodemailer');

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
    console.log('Registering a User with data:', {
      firstName,
      lastName,
      email,
      password,
      role,
      agency_bin,
      agency_name,
      agency_address,
    });

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
    console.log('Error while registering user...', err.message);

    throw new Error('Server error');
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email not registered');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // The user credentials are correct...
    console.log('User successfull logged in!!');

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

exports.forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email not registered');
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: process.env.EMAIL_ADDRESS,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_ADDRESS,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${process.env.FRONTEND_URL}/resetpassword/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await emailService.sendEmail(mailOptions);

    return (
      'An e-mail has been sent to ' + user.email + ' with further instructions.'
    );
  } catch (error) {
    console.error('Error in forgotPassword service:', error.message);
    throw new Error('Server error');
  }
};

exports.resetPassword = async (token, newPassword) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error('Password reset token is invalid or has expired.');
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return 'Password has been reset successfully.';
  } catch (error) {
    console.error('Error in resetPassword service:', error.message);
    throw new Error('Server error');
  }
};
