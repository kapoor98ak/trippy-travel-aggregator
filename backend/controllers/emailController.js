const emailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const from = process.env.EMAIL_ADDRESS || 'your-email@example.com'; // Ensure you have a sender email

    await emailService.sendEmail({ from, to, subject, text });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
};
