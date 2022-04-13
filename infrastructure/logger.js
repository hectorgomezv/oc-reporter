const pino = require('pino');

const { LOG_DESTINATION } = process.env;

module.exports = {
  logger: pino(pino.destination(LOG_DESTINATION)),
};
