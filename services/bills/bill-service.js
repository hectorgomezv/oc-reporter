const path = require('path');
const pdfPrinter = require('../pdf/bill-pdf-printer');
const billRepository = require('../../domain/bills/bill-repository');
const dateFormatter = require('../../domain/dates/date-formatter');
const fileArchiver = require('../../infrastructure/filesystem/file-archiver');

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();
  const printed = bills.map((bill) => pdfPrinter.printBill(ocInfo, bill));

  const now = new Date();
  fileArchiver.zipFolder(path.resolve(pdfPrinter.getOutputDir(now)), dateFormatter.compact(now));

  return printed;
};

const markAsReported = (bills) => {
  console.log('Implement me!');
};

module.exports = { report };
