const fs = require('fs');
const path = require('path');
const mailService = require('@sendgrid/mail');

const {
  SENDGRID_API_KEY,
  SENDGRID_TEMPLATE_ID,
} = process.env;

mailService.setApiKey(SENDGRID_API_KEY);

const sendMail = (attachmentPath) => mailService.send({
  to: 'dusseldorfvampire@gmail.com',
  from: 'hector.gomez.varela@gmail.com',
  templateId: SENDGRID_TEMPLATE_ID,
  attachments: [
    {
      content: fs.readFileSync(attachmentPath, { encoding: 'base64' }),
      filename: path.basename(attachmentPath),
      type: 'application/zip',
      disposition: 'attachment',
    },
  ],
});

module.exports = { sendMail };
