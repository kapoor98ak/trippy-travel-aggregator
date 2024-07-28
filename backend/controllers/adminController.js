const adminService = require('../services/adminService')
const { UserRoles } = require('../utilities/role')

// return total count of travellers
exports.getTravellersCount = async (req, res) => {
    let count = await adminService.getUserCountByType(UserRoles.TRAVELLER)
    return res.send({ totalCount: count })
}

// return total count of agents
exports.getAgentsCount = async (req, res) => {
    let count = await adminService.getUserCountByType(UserRoles.AGENT)
    return res.send({ totalCount: count })
}

// returns month wise count of traveller for given year
exports.getTravellerCountMonthWiseForYear = async (req, res) => {
    let year = req.params.year
    let result = await adminService.getTotalUserCountMonthWiseByYear(year, UserRoles.TRAVELLER)
    return res.send(result)
}

// returns month wise count of traveller for given year
exports.getAgentsCountMonthWiseForYear = async (req, res) => {
    let year = req.params.year
    let result = await adminService.getTotalUserCountMonthWiseByYear(year, UserRoles.AGENT)
    return res.send(result)
}

// returns total active trip count
exports.getActiveTripCount = async (req, res) => {
    let count = await adminService.getTotalTripCountbyStatus("active")
    return res.status(200).json({ totalCount: count })
}

// returns agents approval ratio
exports.getAgentApprovalRatio = async (req, res) => {
    let ratio = await adminService.getApprovedAgentRatio()
    return res.status(200).json({ ratio: ratio })
}

// returns unique year list from users collection
exports.getUniqueYearsListFromUserCollection = async (req, res) => {
    let years = await adminService.getUniqueYearListFromUsers()
    return res.status(200).json(years)
}