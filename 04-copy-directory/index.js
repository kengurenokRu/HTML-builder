const path = require('node:path');
const oldPath = path.resolve(__dirname, "./files");
const newPath = path.resolve(__dirname, "./files(1)");
const dir = require('node:fs').promises;
const fs = require('fs');
if (!fs.existsSync(newPath)) {
dir.mkdir(newPath);
}
const files = dir.readdir(oldPath); 
files.then(function file(data) {    
    for (let i = 0; i<data.length; i+=1)
    {
        fs.copyFile(path.resolve(oldPath, data[i]), path.resolve(newPath, data[i]), (err) => {            
            if (err) {
              console.log(err);
            }
          });
    }         
});
