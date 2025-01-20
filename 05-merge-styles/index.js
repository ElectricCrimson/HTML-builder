const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(destPath, 'utf-8');	

fs.readdir(srcPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error', error);
  }
  files.forEach((file) => {
    if (file.isFile()) {
      const fileType = path.extname(file.name);
      if (fileType === '.css') {
        const filePath = path.join(srcPath, file.name);
        const readStream = fs.createReadStream(filePath, 'utf-8');
        readStream.on('data', (chunk) => writeStream.write(chunk));
      }
    }
  });
});