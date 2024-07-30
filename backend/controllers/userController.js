const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { _id, city, country, age, gender, username, website, contact, bio } =
      req.body;
    console.log(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        city,
        country,
        age,
        gender,
        username,
        website,
        contact,
        bio,
      },
      { new: true },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, agency } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, agency },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
