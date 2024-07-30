const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/update-profile', userController.updateProfile);
router.get('/get-profile/:id', userController.getProfile);

module.exports = router;
