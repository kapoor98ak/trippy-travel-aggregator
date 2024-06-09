require('dotenv').config();

module.exports = {
    email: {
        address: process.env.EMAIL_ADDRESS,
        password: process.env.EMAIL_PASSWORD
    },
    testEmail: {
        address: process.env.TEST_EMAIL_ADDRESS,
        subject: "Test Email Subject",
        body: "Test Email Body"
    },
    port: process.env.PORT || 3000
};