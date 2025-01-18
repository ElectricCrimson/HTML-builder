const fs = require('fs');
const path = require('path');
const joinPath = path.join(__dirname, 'secret-folder');

fs.readdir(joinPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error', error);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(joinPath, file.name);
        const fileName = file.name.slice(0, file.name.indexOf('.'));
        const type = path.extname(file.name).replace('.', '');

        fs.stat(filePath, (error, stats) => {
          if (error) {
            console.log('Error', error);
          } else {
            const size = `${(stats.size / 1024).toFixed(3)}kb`;
            console.log(`${fileName} - ${type} - ${size}`);
          }
        });
      }
    });
  }
});