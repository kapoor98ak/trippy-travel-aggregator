const User = require('../models/User');
const Trip = require('../models/Trip');

// Returns total count of user having particular role
exports.getUserCountByType = async (userType) => {
  try {
    let result = await User.countDocuments({ role: userType });
    return result;
  } catch (error) {
    console.log(
      `Unable to fetch user count for role: ${userType} | Error : ${error}`,
    );
    return null;
  }
};

// Returns total count of trips by status
exports.getTotalTripCountbyStatus = async (status) => {
  try {
    let result = await Trip.countDocuments({ status: status });
    return result;
  } catch (error) {
    console.log(
      `Unable to fetch trip count for status: ${status} | Error : ${error}`,
    );
    return null;
  }
};

// Returns user count month wise for given role
exports.getTotalUserCountMonthWiseByYear = async (year, role) => {
  try {
    const pipeline = [
      {
        $match: {
          role: role,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${parseInt(year) + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id', 1] }, then: 'January' },
                { case: { $eq: ['$_id', 2] }, then: 'February' },
                { case: { $eq: ['$_id', 3] }, then: 'March' },
                { case: { $eq: ['$_id', 4] }, then: 'April' },
                { case: { $eq: ['$_id', 5] }, then: 'May' },
                { case: { $eq: ['$_id', 6] }, then: 'June' },
                { case: { $eq: ['$_id', 7] }, then: 'July' },
                { case: { $eq: ['$_id', 8] }, then: 'August' },
                { case: { $eq: ['$_id', 9] }, then: 'September' },
                { case: { $eq: ['$_id', 10] }, then: 'October' },
                { case: { $eq: ['$_id', 11] }, then: 'November' },
                { case: { $eq: ['$_id', 12] }, then: 'December' },
              ],
              default: 'Unknown',
            },
          },
          count: 1,
        },
      },
      {
        $match: {
          count: { $gt: 0 }, // Filter out months with count === 0
        },
      },
      {
        $sort: { month: 1 },
      },
    ];

    const result = await User.aggregate(pipeline);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch user count by month');
  }
};

// Returns percentage of approved agents
exports.getApprovedAgentRatio = async () => {
  try {
    let agentString = 'agent';
    let totalAgents = await User.countDocuments({ role: agentString });
    let approvedAgents = await User.countDocuments({
      role: agentString,
      isApproved: true,
    });
    let approvalRatio = ((approvedAgents / totalAgents) * 100).toFixed(2);
    return approvalRatio;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch approval ratio for agents');
  }
};

// returns list of unique years in users collection
exports.getUniqueYearListFromUsers = async () => {
  try {
    const years = await User.aggregate([
      {
        $group: {
          _id: { $year: '$createdAt' },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
        },
      },
      {
        $sort: { year: 1 },
      },
    ]);
    const uniqueYears = years.map((y) => y.year);
    return uniqueYears;
  } catch (err) {
    console.error(err);
    throw new Error('Unable to fetch unique years from users collection');
  }
};
