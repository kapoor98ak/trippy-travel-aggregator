const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getTotalTravellers', adminController.getTravellersCount);
router.get('/getTotalAgents', adminController.getAgentsCount);
router.get('/getMonthWiseTravellerCountForYear/:year', adminController.getTravellerCountMonthWiseForYear)
router.get('/getMonthWiseAgentCountForYear/:year', adminController.getAgentsCountMonthWiseForYear)

module.exports = router;
