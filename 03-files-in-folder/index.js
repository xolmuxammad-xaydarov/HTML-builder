const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
  if (err) return console.log(err.message);
  files.forEach((file) => {
    if (file.isFile()) {
      let fileName = file.name.split('.')[0];
      let fileExt = path.extname(file.name).split('.').join('');
      fs.stat(path.join(way, file.name), (err, data) => {
        if (err) return console.log(err.message);
          return console.log(`${fileName} - ${fileExt} - ${(data.size / 1024).toFixed(2)} kb`);
      });
    }
  });
});
