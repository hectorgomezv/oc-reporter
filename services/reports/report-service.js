const billService = require('../bills/bill-service');
const { emailSender, logger } = require('../../infrastructure');

/**
 * Reports items by configured services.
 */
const report = async () => {
  const unreportedData = await billService.report();
  emailSender.sendMail('foo');
  logger.info(`Reporting ${unreportedData.length} items`);
};

module.exports = { report };
