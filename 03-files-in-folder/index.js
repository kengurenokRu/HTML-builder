const path = require('node:path');
const myPath = path.resolve(__dirname, "./secret-folder");
const dir = require('node:fs').promises;
const fs = require('fs');
const files = dir.readdir(myPath, { withFileTypes: true });
let str = [];
let filenames = [];
files.then(function file(data, err) {
    if (err) console.log("Непредвиденная ошибка.");
    else {
        if (data.length === 0) console.log("Директория пуста");
        else {
            for (let i = 0; i < data.length; i++) {
                str.push(path.basename(data[i].name, path.extname(data[i].name)) + " - " + path.extname(data[i].name).slice(1) + " - ");
                filenames.push(path.basename(data[i].name));
            };
            let count = 0;
            for (let i = 0; i <= str.length - 1; i++) {
                fs.stat(path.resolve(__dirname, "./secret-folder/", String(filenames[i])), function (err, stats) {
                    if (err) console.log("Непредвиденная ошибка.");
                    else {
                        if (stats.isFile()) {
                            count++;
                            console.log(str[i] + (stats["size"]).toString() + " бит");
                        }
                    }
                });
            }
            if (count === 0) console.log("Файлов в директории нет");
        }
    }
});

