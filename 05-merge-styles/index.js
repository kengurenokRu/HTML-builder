const path = require('node:path');
const dir = require('node:fs').promises;
const fs = require('fs');
 
let pathCss = path.resolve(__dirname, "./project-dist/bundle.css");
const newfile = new fs.WriteStream(pathCss);

pathCss = path.resolve(__dirname, "./styles");
const files = dir.readdir(pathCss);
files.then(function file(data) {
    let res = "";
    for (let i = 0; i < data.length; i++) {
        fs.stat(path.resolve(pathCss, data[i]), function (err, stats) {
            if (stats.isFile() && path.extname(data[i]) === '.css') {
                let fileTemp = new fs.ReadStream(path.resolve(pathCss, data[i]));
                fileTemp.on('readable', function () {
                    while ((dataTemp = fileTemp.read()) != null) {  
                        newfile.write(dataTemp);
                    }
                });
            }
        });
    };  
});

