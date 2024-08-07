// services/travelRequestService.js
const TravelRequest = require('../models/travelRequest');
const emailService = require('../services/emailService');
const Booking = require('../models/Booking');
const User = require('../models/User');


exports.createTravelRequest = async (travelRequestData) => {

    const { traveler, travelerId, title, source, destination, startDate, endDate, budget, itineraryDetails, numOfTravellers, amenities } = travelRequestData
    // Fetch all agents and assign the request to a random agent
    const agents = await User.find({ role: 'agent' });

    if (agents.length === 0) {
        return res.status(400).json({ message: 'No agents available' });
    }
    const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

    const travelRequest = new TravelRequest({
        title,
        source,
        destination,
        startDate,
        endDate,
        budget,
        itineraryDetails,
        numOfTravellers,
        amenities,
        travelerId,
        agentId: assignedAgent._id,
    });
    const savedTravelRequest = await travelRequest.save();
  
    // Send email notification to the traveler
    const mailOptions = {
      to: traveler.email,
      from: process.env.EMAIL_ADDRESS,
      subject: 'New Travel Request Created',
      text: `Hello ${traveler.firstName},\n\nYour travel request titled "${savedTravelRequest.title}" has been created successfully.\n\nBest Regards,\nTrippy`,
    };
    await emailService.sendEmail(mailOptions);
  
    return savedTravelRequest;
};

exports.getAllTravelRequests = async () => {
    try{
        const allRequests = await TravelRequest.find()
        return allRequests;
    }catch (error) {
        console.log("Error while fetching all the travel requests...");
        throw new Error(error.message);
    }
};
exports.updateRequestStatus = async (requestId, status) => {
    try {
        const request = await TravelRequest.findByIdAndUpdate(
            requestId,
            { status: status },
            { new: true }
        );
        if (request) {
            // Fetch traveler details
            const traveler = await User.findById(request.travelerId);

            // Send email notification to the traveler about the status update
            const mailOptions = {
                to: traveler.email,
                from: process.env.EMAIL_ADDRESS,
                subject: 'Travel Request Status Update',
                text: `Hello ${traveler.firstName},\n\nThe status of your travel request titled "${request.title}" has been updated to "${status}".\n\nBest Regards,\nTrippy`,
            };
            await emailService.sendEmail(mailOptions);
        }

        return request;
    } catch (error) {
        console.error('Error updating request status:', error);
        throw error;
    }
};



