const mailService = require('@sendgrid/mail');

const {
  SENDGRID_API_KEY,
  SENDGRID_TEMPLATE_ID,
} = process.env;

mailService.setApiKey(SENDGRID_API_KEY);

const sendMail = (attachment) => mailService.send({
  to: 'to@gmail.com',
  from: 'from@gmail.com',
  templateId: SENDGRID_TEMPLATE_ID,
  // subject: 'Sending with Twilio SendGrid is Fun',
  // text: 'and easy to do anywhere, even with Node.js',
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // attachments: [
  //   {
  //     content: attachment.toString('base64'),
  //     filename: 'attachment.pdf',
  //     type: 'application/pdf',
  //     disposition: 'attachment',
  //   },
  // ],
});

module.exports = { sendMail };
