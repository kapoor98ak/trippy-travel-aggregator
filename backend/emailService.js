// emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send custom email
async function sendEmail(email, subject, message) {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'your-email@gmail.com', // Your email address
            to: email,
            subject: subject,
            text: message
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };
