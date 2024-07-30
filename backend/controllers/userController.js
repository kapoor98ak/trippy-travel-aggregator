const User = require('../models/User');

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
