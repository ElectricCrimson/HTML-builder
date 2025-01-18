const { stdin, stdout } = process;
const fs = require('fs');
const outputStream = fs.createWriteStream('document.txt', 'utf-8');

stdout.write('Hello!:) Write your text, please.\n');

stdin.on('data', (data) => {
  const toStr = data.toString().trim();

  outputStream.on("error", (error) => console.log("Error", error.message));

  if (toStr === 'exit') {
    process.exit();
  } else {
    outputStream.write(toStr + '\n');
  }
});

process.on('exit', (code) => {
  if (!code) {
    stdout.write('Thank U! Bye. ^_^');
  } else {
    stderr.write('Something went wrong');
  }
});

process.on('SIGINT', () => {
  process.exit();
});
