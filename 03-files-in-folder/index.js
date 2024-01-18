const path = require('node:path');
const myPath = path.resolve(__dirname, "./secret-folder");
const dir = require('node:fs').promises;
const files = dir.readdir(myPath, { withFileTypes: true });
let count = -1;
let str = [];
let filenames = [];
let k = -1;
files.then(function file(data) {
    data.forEach(function f(file) {
        count++;
        str.push(path.basename(file.name) + "-" + path.extname(file.name) + "-");
        filenames.push(path.basename(file.name));
    });
    k++;
    let obj = dir.stat(path.resolve(__dirname, "./secret-folder/", String(filenames[k])));
    obj.then(function b(el) {str[k] += String(el.size); });
});
for (let i = 0; i<=k; i++)
    {
    
    console.log(str[i]);
    }