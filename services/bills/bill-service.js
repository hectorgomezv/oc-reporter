const billRepository = require('../../domain/bills/bill-repository');
const pdfPrinter = require('../../infrastructure/pdf/bill-pdf-printer');

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();

  return bills.map((bill) => pdfPrinter.printBill(ocInfo, bill));
};

const markAsReported = (bills) => {
  console.log('Implement me!');
};

module.exports = { report };
