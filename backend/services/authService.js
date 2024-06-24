const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agency = require('../models/Agency');

exports.registerUser = async ({
  name,
  email,
  password,
  role,
  address,
  agencyName,
  agencyBIN,
  agencyAddress,
}) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
      // return res.status(400).json({ msg: "User already exists" });
    }

    if (role === 'agent') {
      let agency = await Agency.findOne({ binNumber: agencyBIN });
      if (agency) {
        throw new Error('Agency with this BIN already exists');
        // return res
        //   .status(400)
        //   .json({ msg: "Agency with this BIN already exists" });
      }

      agency = new Agency({
        name: agencyName,
        binNumber: agencyBIN,
        address: agencyAddress,
      });

      await agency.save();

      user = new User({
        name,
        email,
        password,
        role,
        address,
        agency: agency.id,
      });
    } else {
      user = new User({
        name,
        email,
        password,
        role,
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        isApproved: user.isApproved,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      },
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
    // return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
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

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
};
