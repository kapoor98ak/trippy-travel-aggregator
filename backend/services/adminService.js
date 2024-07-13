const User = require('../models/User');

// Returns total count of user having particular role
exports.getUserCountByType = async (userType) => {
    try {
        let result = await User.countDocuments({ role: userType })
        return result
    }
    catch (error) {
        console.log(`Unable to fetch user count for role: ${userType} | Error : ${error}`)
        return null
    }
}

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
                    count: { $gt: 0 } // Filter out months with count === 0
                }
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
}

