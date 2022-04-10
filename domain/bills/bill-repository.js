const billClient = require('../../infrastructure/http/bill-client');

const findUnreportedBills = async () => {
  const { data: { ocInfo, bills } } = await billClient.getUnreportedBills();

  return { ocInfo, bills };
};

module.exports = { findUnreportedBills };
