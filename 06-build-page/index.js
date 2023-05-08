const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => err);
let copyWayFolder = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(copyWayFolder, {recursive: true}, err => err);

let html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
let htmlArr = [];
let i = 0;

fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, data) => {
  if (err) console.error(err);
  data.forEach(item => {
    if (path.extname(item.name) === '.html' && item.isFile()) {
      htmlArr.push(item.name);
    }
  })
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) console.error(err);
  changeIndex(data);
})

function changeIndex(text, teg = htmlArr[0]) {
  fs.readFile(path.join(__dirname, 'components', teg), 'utf-8', (err, data) => {
    if (err) console.error(err);
    let changeTag = `{{${teg.split('.')[0]}}}`;
    text = text.replace(changeTag, data);
    i++
    (i === htmlArr.length) ? html.write(text) : changeIndex(text, htmlArr[i]);
  })
}

const css = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

function folder(way, copyWay) {
  fsPromise.rm(copyWay, {recursive: true, force: true})
  .then(() => {
    fsPromise.mkdir(copyWay, {recursive: true});
    fsPromise.readdir(way, {withFileTypes: true})
    .then((files) => {
      files.forEach(item => {
        if (item.isFile()) {
          fsPromise.copyFile(path.join(way, item.name), path.join(copyWay, item.name));
        } else {
          folder(path.join(way, item.name), path.join(copyWay, item.name));
        }
      });
    });
  });
}

folder(path.join(__dirname, 'assets'), copyWayFolder);

function copyStyleFiles(styleWay) {
  fs.readdir(styleWay, {withFileTypes:true}, (err, files) => {
    if (err) console.error(err);
    files.forEach(item => {
      if (item.isFile()) {
        pipeStyles(item.name);
      }
    })
  });
}

copyStyleFiles(path.join(__dirname, 'styles'));

function pipeStyles(fileName) {

  const readStream = fs.createReadStream(path.join(__dirname, 'styles', fileName));
  readStream.pipe(css);
  readStream.on('error', error => console.error(error.message));

}