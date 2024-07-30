const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/update-profile', userController.updateProfile);
router.get('/get-profile/:id', userController.getProfile);


router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
