const fs = require('fs');
const path = require('path');
const pathJoin = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathJoin, 'utf-8');
let data = '';

stream.on('error', (error) => {
  console.error('Error!', error);
});

stream.on('data', (chunk) => {
  console.log(data += chunk);
});