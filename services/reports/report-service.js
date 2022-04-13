const billService = require('../bills/bill-service');
const { logger } = require('../../infrastructure');

/**
 * Reports items by configured services.
 */
const report = async () => {
  try {
    const unreportedData = await billService.report();
    logger.info(`${unreportedData.length} items reported.`);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { report };
