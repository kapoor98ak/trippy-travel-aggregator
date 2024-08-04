// services/travelRequestService.js
const TravelRequest = require('../models/travelRequest');

exports.createTravelRequest = async (data) => {
    const travelRequest = new TravelRequest(data);
    return await travelRequest.save();
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
        return request;
    } catch (error) {
        console.error('Error updating request status:', error);
        throw error;
    }
};


exports.getRequestsByTravelerId = async (travelerId) => {
    try {
        console.log("service", travelerId)
        const requests = await TravelRequest.find({ travelerId: travelerId });
        console.log(requests)
        return requests;
    } catch (error) {
        console.error('Error fetching travel requests by travelerId:', error);
        throw new Error(error.message);
    }
}
