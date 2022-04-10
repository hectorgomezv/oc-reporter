const path = require('path');
const { zip } = require('zip-a-folder');

const zipFolder = async (dirPath, filename) => {
  const filePath = path.join(dirPath, '..', `${filename}.zip`);
  await zip(dirPath.toString(), filePath.toString());
};

module.exports = { zipFolder };
