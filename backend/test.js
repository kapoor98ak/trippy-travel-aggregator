// test.js
const { sendEmail } = require('./emailService');

// Example usage: Sending a test email
async function sendTestEmail() {
    const recipientEmail = 'yashbest005@gmail.com'
    // 'kapoor98.ak@gmail.com'
    // 'adv-web-g6@googlegroups.com';
    const subject = 'Trippy\'s Email';
    const message = 'Hello, this is a test email from Trippy\'s backend!';

    try {
        await sendEmail(recipientEmail, subject, message);
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

// Call the function to send the test email
sendTestEmail();
