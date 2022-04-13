const pino = require('pino');

module.exports = {
  logger: pino(pino.destination('./out.log')),
};
