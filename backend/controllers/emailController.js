const emailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        await emailService.sendEmail(to, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
};
