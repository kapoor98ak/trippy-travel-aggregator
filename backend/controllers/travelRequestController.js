// controllers/personalRequestController.js

const travelRequest = require('../models/travelRequest');
const User = require('../models/User');
const {updateRequestStatus} = require("../services/travelRequestService");
const travelRequestService = require("../services/travelRequestService");

// Create a new personal request
exports.createRequest = async (req, res) => {
    try {
        const { title, source, destination, startDate, endDate, budget, itineraryDetails, numOfTravellers, amenities } = req.body;
        const travelerId = req.user._id;
        const traveler = req.user;
        const travelRequestData = { traveler, travelerId, title, source, destination, startDate, endDate, budget, itineraryDetails, numOfTravellers, amenities };
        newRequest = await travelRequestService.createTravelRequest(travelRequestData);
        
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get personal requests by traveler ID
exports.getRequestsByTraveler = async (req, res) => {
    try {
        const travelerId = req.user._id;
        const requests = await travelRequest.find({ travelerId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get personal requests by agent ID
exports.getRequestsByAgent = async (req, res) => {
    try {
        const agentId = req.user._id;
        const requests = await travelRequest.find({ agentId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveRequest = async (req, res) => {
    try {
        const requestId = req.params._id;
        const updatedRequest = await updateRequestStatus(requestId, 'Approved');
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error('Error approving request:', error);
        res.status(500).json({ message: 'Error approving request' });
    }
};

exports.rejectRequest = async (req, res) => {
    try {
        const requestId = req.params._id;
        console.log(requestId)
        const updatedRequest = await updateRequestStatus(requestId, 'rejected');
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).json({ message: 'Error rejecting request' });
    }
};

