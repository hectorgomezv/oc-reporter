global.window = {};
const fs = require('fs');
const { jsPDF } = require('jspdf');
const { applyPlugin } = require('jspdf-autotable/dist/jspdf.plugin.autotable');
const dateFormatter = require('../../domain/dates/date-formatter');

applyPlugin(jsPDF);

const BILL_COLUMNS = ['#Albaran', 'Fecha', '#Lineas', 'Subtotal', 'Impuestos', 'Total'];
const RATES_COLUMNS = ['Base', 'IVA %', 'IVA €', 'R.E. %', 'R.E. €', 'Importe'];

const getOutputDir = () => {
  const dir = `./output/${dateFormatter.compact(new Date())}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return dir;
};

const getBillFilename = ({ name }, { code }, createdAt) => `${code}-`
  + `${dateFormatter.compact(new Date(createdAt))}-`
  + `${name.replace(/ /g, '_')}`;

const getDateText = (date) => `Fecha ${new Date(date).toLocaleDateString('en-GB')}`;

const getCustomerAddressText = ({
  name,
  business_name: businessName,
  cif = '',
  address = '',
  address2 = '',
  phone = '',
  email = '',
}) => `${businessName || name}
${cif}
${address}
${address2}
${phone}
${email}`;

const getMetadataAddressText = ({
  business_name: businessName,
  cif,
  address,
  address2,
  email,
  web,
}) => `${businessName}
${cif}
${address}
${address2}
${email}
${web}`;

const addCommonHeader = (doc, metadata, text) => {
  doc.addImage(metadata.image, 'PNG', 34, 26, 212, 71);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(getMetadataAddressText(metadata), 51, 126);
  doc.setFont('helvetica', 'bold');
  doc.text(text, 312, 70);
};

const addCustomerAndDateHeader = (doc, metadata, date, customer, text) => {
  addCommonHeader(doc, metadata, text);
  doc.text(getDateText(date), 312, 85);
  doc.text('Cliente:\n', 312, 115);
  doc.setFont('helvetica', 'normal');
  doc.text(getCustomerAddressText(customer), 312, 130);
};

const getOrdersRows = (orders) => orders.map((order) => [
  order.code,
  order.date,
  order.linesCount,
  order.netTotal,
  order.rates,
  order.total,
]);

const getRatesRows = (rates) => rates
  .map((rl) => [rl.netTotal, rl.rate, rl.amountRate, rl.associatedEq, rl.amountEq, rl.total]);

const addTotal = (doc, total) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${total}€`, doc.internal.pageSize.width - 120, doc.lastAutoTable.finalY + 25);
};

const printBill = (metadata, bill) => {
  const doc = new jsPDF('p', 'pt');

  const {
    createdAt,
    customer,
    orders,
    rates,
    total,
  } = bill;

  addCustomerAndDateHeader(doc, metadata, createdAt, customer, `FACTURA no. #${bill.code}`);

  let positionY = 200;

  doc.autoTable(
    BILL_COLUMNS,
    getOrdersRows(orders),
    {
      startY: positionY + 8,
      margin: { bottom: 50 },
      headStyles: { fontSize: 9, minCellHeight: 20 },
      bodyStyles: { fontSize: 9, minCellHeight: 18 },
      theme: 'grid',
    },
  );

  positionY = doc.lastAutoTable.finalY + 20;
  const remainingSpace = parseFloat(doc.internal.pageSize.height - doc.lastAutoTable.finalY);

  if (remainingSpace < 200) {
    doc.addPage();
  }

  doc.autoTable(
    RATES_COLUMNS,
    getRatesRows(rates),
    {
      startY: parseFloat(doc.internal.pageSize.height - 150),
      margin: { left: 250 },
      theme: 'grid',
    },
  );

  addTotal(doc, total);

  const data = doc.output();

  fs.writeFileSync(
    `${getOutputDir(createdAt)}/${getBillFilename(customer, bill, createdAt)}.pdf`,
    data,
    'binary',
  );

  return bill.code;
};

module.exports = { getOutputDir, printBill };
