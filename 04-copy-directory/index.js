const fs = require('fs');
const path = require('path');
const newFolder = path.join(__dirname, 'files-copy');
const baseFolder = path.join(__dirname, 'files');

fs.rm(newFolder, { recursive: true }, () => {
  fs.mkdir(newFolder, { recursive: true },
    (error) => {
      if (error) {
        console.log('Error', error);
      }
      copyDir();
  });
});

function copyDir() {
  fs.readdir(baseFolder, (error, files) => {
    if (error) {
      console.log('Error', error);
    }
  
    files.forEach(file => {
      const srcFile = path.join(baseFolder, file);
      const destFile = path.join(newFolder, file);

      fs.copyFile(srcFile, destFile, () => {
        fs.readFile(destFile, 'utf-8', (error) => {
          if (error) {
            console.log('Error', error);
          }
        });
      });
    });
  });
}