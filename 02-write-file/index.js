const fs = require('fs');
const {stdin, stdout} = process;


const file = fs.createWriteStream('02-write-file/text.txt');

stdout.write('Hi! write some text...\n');

stdin.on('data', data => {
  if (data.toString == 'exit\r\n') process.exit();
  if (process.on('SIGINT', () => process.exit()));
  file.write(data);
});

process.on('exit', (err) => {
  if(err) return console.error(err.message);
  stdout.write('Good buy!');
})