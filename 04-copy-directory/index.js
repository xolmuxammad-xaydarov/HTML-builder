const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'files');
const copyFiles = path.join(__dirname, 'files-copy');

fs.rm(copyFiles, { recursive: true, force: true }).then(() => {
  fs.mkdir(copyFiles, { recursive: true });
  fs.readdir(folder, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        let pathFolder = path.join(folder, file.name);
        let pathCopy = path.join(copyFiles, file.name);
        fs.copyFile(pathFolder, pathCopy);
      }
    });
  })
});
