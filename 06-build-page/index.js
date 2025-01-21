const fs = require('fs');
const path = require('path');
const destFldr = path.join(__dirname, 'project-dist');
const templPath = path.join(__dirname, 'template.html');

const srcPath = path.join(__dirname, 'styles');
const cssPath = path.join(destFldr, 'style.css');
const cssWriteStream = fs.createWriteStream(cssPath, 'utf-8');

const htmlBasePath = path.join(__dirname, 'components');
const htmlReadStream = fs.createReadStream(templPath, 'utf-8');
const htmlWriteFile = path.join(destFldr, 'index.html');

const baseFolder = path.join(__dirname, 'assets');
const destAssets = path.join(destFldr, 'assets');


fs.mkdir(destFldr, { recursive: true },
  (error) => {
    if (error) {
      console.log('Error', error);
    }
});


htmlReadStream.on('data', (data) => {
  let htmlContent = `${data}`;
  fs.readdir(htmlBasePath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error', error);
    }
    files.forEach((html) => {
      if (html.isFile()) {
        const fileType = path.extname(html.name);
        if (fileType === '.html') {
          const filePath = path.join(htmlBasePath, html.name);
          const fileName = `{{${html.name.replace(fileType, '')}}}`;
          const readStream = fs.createReadStream(filePath, 'utf-8');
          readStream.on('data', (chunk) => {
            htmlContent = htmlContent.replaceAll(fileName, chunk);
            fs.writeFile(htmlWriteFile, htmlContent, (error) => {
              if (error) {
                console.log('Error', error);
              }
            });
          });
        }
      }
    });
  });
});


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
        readStream.on('data', (chunk) => cssWriteStream.write(chunk));
      }
    }
  });
});


fs.rm(destAssets, { recursive: true }, () => {
  fs.mkdir(destAssets, { recursive: true },
    (error) => {
      if (error) {
        console.log('Error', error);
      }
      copyDir(baseFolder, destAssets);
  });
});

function copyDir(src, dest) {
  fs.readdir(src, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error', error);
    }
    files.forEach(file => {
      const srcFile = path.join(src, file.name);
      const destFile = path.join(dest, file.name);
      if (file.isDirectory()) {
        fs.mkdir(destFile, { recursive: true }, (error) => {
          if (error) {
            console.log('Error', error);
          } else {
            copyDir(srcFile, destFile);
          }
        });
      } else {
        fs.copyFile(srcFile, destFile, (error) => {
          if (error) {
            console.log('Error', error);
          }
        });
      }
    });
  });
}