

const express = require('express');
const router = express.Router();
const travelRequestController = require('../controllers/travelRequestController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create-request', authMiddleware, travelRequestController.createRequest);
// router.get('/traveler/:travelerId', authMiddleware, travelRequestController.getRequestsByTraveler);
router.get('/agent/:agentId', authMiddleware, travelRequestController.getRequestsByAgent);

// New routes for approving and rejecting requests
router.put('/request/:_id/approve', authMiddleware, travelRequestController.approveRequest);
router.put('/request/:_id/reject', authMiddleware, travelRequestController.rejectRequest);

router.get('/traveler/:travelerId', travelRequestController.getRequestsByTraveler);

module.exports = router;
