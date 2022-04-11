const path = require('path');
const pdfPrinter = require('../pdf/bill-pdf-printer');
const billRepository = require('../../domain/bills/bill-repository');
const dateFormatter = require('../../domain/dates/date-formatter');
const { emailSender, fileArchiver } = require('../../infrastructure');

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();
  const printed = bills.map((bill) => pdfPrinter.printBill(ocInfo, bill));

  const filePath = await fileArchiver.zipFolder(
    path.resolve(pdfPrinter.getOutputDir()),
    dateFormatter.compact(new Date()),
  );

  await emailSender.sendMail(filePath);
  await markAsReported(bills);

  return printed;
};

const markAsReported = (bills) => {
  console.log(bills);
};

module.exports = { report };
