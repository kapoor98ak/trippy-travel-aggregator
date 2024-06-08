require('dotenv').config();

module.exports = {
    email: {
        address: process.env.EMAIL_ADDRESS,
        password: process.env.EMAIL_PASSWORD
    },
    port: process.env.PORT || 3000
};