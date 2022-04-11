const { billClient } = require('./http');
const { emailSender } = require('./email');
const { fileArchiver } = require('./filesystem');
const { logger } = require('./logger');

module.exports = {
  billClient,
  emailSender,
  fileArchiver,
  logger,
};
