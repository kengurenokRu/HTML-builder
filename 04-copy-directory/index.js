const path = require('node:path');
const oldPath = path.resolve(__dirname, "./files");
const newPath = path.resolve(__dirname, "./files-copy");
const dir = require('node:fs').promises;
const fs = require('fs');

function copyFiles() {
  dir.mkdir(newPath, { recursive: true });
  const files = dir.readdir(oldPath);

  files.then(function file(data) {
    for (let i = 0; i < data.length; i += 1) {
      fs.copyFile(path.resolve(oldPath, data[i]), path.resolve(newPath, data[i]), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  let pathes = [];
  const files2 = dir.readdir(newPath);
  files.then(function file(data) {
    files2.then(function file(data2) {
      for (let i = 0; i < data2.length; i++) {
        let k = -1;
        for (let j = 0; j < data.length; j++) {
          if (data2[i] == data[j]) {
            k = j;
            break;
          }
        }
        if (k === -1) {
          pathes.push(data2[i]);
        }
      }
      for (let i = 0; i < pathes.length; i++) {
        fs.unlink(path.resolve(newPath, pathes[i]), (err) => {
          if (err) throw err;
        });
      }
    });
  });

}
copyFiles();

