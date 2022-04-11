const { billClient } = require('../../infrastructure');

const findUnreportedBills = async () => {
  const { data: { ocInfo, bills } } = await billClient.getUnreportedBills();

  return { ocInfo, bills };
};

module.exports = { findUnreportedBills };
