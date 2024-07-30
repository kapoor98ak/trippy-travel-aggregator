const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getTotalTravellers', adminController.getTravellersCount);
router.get('/getTotalAgents', adminController.getAgentsCount);

router.get('/getMonthWiseTravellerCountForYear/:year', adminController.getTravellerCountMonthWiseForYear);
router.get('/getMonthWiseAgentCountForYear/:year', adminController.getAgentsCountMonthWiseForYear);
router.get('/getActiveTripCount', adminController.getActiveTripCount);
router.get('/getAgentsApprovalRatio', adminController.getAgentApprovalRatio);
router.get('/getUniqueYearsFromUsers', adminController.getUniqueYearsListFromUserCollection);
router.get('/getUnApprovedAgentsList', adminController.getUnApprovedAgentsList)
router.post('/approveAgentById', adminController.approveAgentById)
router.post('/rejectAgentById', adminController.rejectAgentById)

// Temporary Admin Route for creating Admin User Credentials for the application

// router.post('/create-admin', async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'Admin user already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       passwordHash,
//       role: 'admin',
//     });

//     await user.save();
//     res.status(201).json({ message: 'Admin user created successfully' });
//   } catch (error) {
//     console.error('Error creating admin user:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
