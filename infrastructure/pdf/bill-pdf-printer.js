global.window = {};
const fs = require('fs');
const { jsPDF } = require('jspdf');
const { applyPlugin } = require('jspdf-autotable/dist/jspdf.plugin.autotable');

applyPlugin(jsPDF);

const printBill = () => {
  const doc = new jsPDF();

  doc.autoTable({
    head: [['ID', 'Name', 'Email', 'Country', 'IP-address']],
    body: [
      ['1', 'HelloäöüßÄÖÜ', 'dmoore0@furl.net', 'China', '211.56.242.221'],
      ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
      ['3', 'Ruth', 'rwells2@example.com', 'Trinidad', '19.162.133.184'],
      ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
      ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
      ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
    ],
  });

  const data = doc.output();
  fs.writeFileSync('./document.pdf', data, 'binary');
};

module.exports = { printBill };
