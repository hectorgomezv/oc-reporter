require('dotenv').config();
const reportsService = require('./services/reports/report-service');

const main = async () => {
  await reportsService.report();
};

(() => main())();
