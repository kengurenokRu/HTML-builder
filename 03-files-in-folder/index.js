const path = require('node:path');
const myPath = path.resolve(__dirname, "./secret-folder");
const dir = require('node:fs').promises;
const fs = require('fs');
const files = dir.readdir(myPath, { withFileTypes: true });
let str = [];
let filenames = [];
files.then(function file(data) {
    data.forEach(function f(file) {
        str.push(path.basename(file.name, path.extname(file.name)) + " - " + path.extname(file.name).slice(1) + " - ");
        filenames.push(path.basename(file.name));
    });
    for (let i = 0; i <= str.length - 1; i++) {
        fs.stat(path.resolve(__dirname, "./secret-folder/", String(filenames[i])), function (err, stats) {
            if (stats.isFile())
                console.log(str[i] + (stats["size"]/1000).toString()+" kb");
        });
    }
});

