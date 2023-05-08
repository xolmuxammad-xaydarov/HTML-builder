const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist','bundle.css');

const writeStyles = fs.createWriteStream(bundlePath);

fs.readdir(stylesPath, {withFileTypes:true}, (err, fileNames) => {
  if (err) console.error(err.message);
  fileNames.forEach(fileName => {
    let fileExt = path.extname(fileName.name)
    if (fileName.isFile() || fileExt === '.css') {
      const readStream = fs.createReadStream(path.join(stylesPath, fileName.name));
      readStream.on('data', data => writeStyles.write(data));
      readStream.on('error', error => console.error(error.message));
    }
  })
})