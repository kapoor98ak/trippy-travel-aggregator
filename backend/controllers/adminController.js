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