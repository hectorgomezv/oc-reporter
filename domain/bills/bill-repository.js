const { billClient } = require('../../infrastructure');

const findUnreportedBills = async () => {
  const { data: { ocInfo, bills } } = await billClient.getUnreportedBills();

  return { ocInfo, bills };
};

const markAsReported = (billCodes) => billClient.markAsReported(billCodes);

module.exports = { findUnreportedBills, markAsReported };
