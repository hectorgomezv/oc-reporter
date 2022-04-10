const billRepository = require('../../domain/bills/bill-repository');

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();

  return bills;
};

const markAsReported = (bills) => {
  console.log('Implement me!');
};

module.exports = { report };
