const nodemailer = require('nodemailer');
const emailService = require('../../../services/emailService');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('Email Service', () => {
  let sendMailMock;

  beforeEach(() => {
    sendMailMock = jest.fn().mockResolvedValue('Email sent');
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should send an email successfully', async () => {
    const emailData = {
      from: 'test@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    await emailService.sendEmail(emailData);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
    });
  });

  test('should throw an error if email sending fails', async () => {
    sendMailMock.mockRejectedValue(new Error('Failed to send email'));

    const emailData = {
      from: 'test@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    await expect(emailService.sendEmail(emailData)).rejects.toThrow('Error sending email');
  });
});
