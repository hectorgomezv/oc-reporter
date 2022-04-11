const path = require('path');
const pdfPrinter = require('../pdf/bill-pdf-printer');
const billRepository = require('../../domain/bills/bill-repository');
const dateFormatter = require('../../domain/dates/date-formatter');
const { emailSender, fileArchiver } = require('../../infrastructure');

const markAsReported = (bills) => billRepository.markAsReported(bills.map((b) => b.code));

const report = async () => {
  const { ocInfo, bills } = await billRepository.findUnreportedBills();
  const printed = bills.map((bill) => pdfPrinter.printBill(ocInfo, bill));

  if (bills.length) {
    const filePath = await fileArchiver.zipFolder(
      path.resolve(pdfPrinter.getOutputDir()),
      dateFormatter.compact(new Date()),
    );

    await emailSender.sendMail(filePath);
    await markAsReported(bills);
  }

  return printed;
};

module.exports = { report };
