const billRepository = require('../../domain/bills/bill-repository');
const pdfPrinter = require('../../infrastructure/pdf/bill-pdf-printer');

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();
  pdfPrinter.printBill();

  return bills;
};

const markAsReported = (bills) => {
  console.log('Implement me!');
};

module.exports = { report };
