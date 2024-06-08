const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email.address,
        pass: config.email.password
    }
});

exports.sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: config.email.address,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};
