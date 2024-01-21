const path = require('node:path');
const dir = require('node:fs').promises;
const fs = require('fs');

let pathCss = path.resolve(__dirname, "./project-dist/style.css");
let pathHtml = path.resolve(__dirname, "./project-dist/index.html");
const oldPathAssets = path.resolve(__dirname, "./assets");
let newPathAssets = path.resolve(__dirname, "./project-dist");

/*копирование диектории assets*/
dir.mkdir(newPathAssets, { recursive: true });
let directories = dir.readdir(newPathAssets);
newPathAssets = path.resolve(__dirname, "./project-dist/assets");
dir.mkdir(newPathAssets, { recursive: true });
let files = dir.readdir(oldPathAssets);
files.then(function file(data) {
    for (let i = 0; i < data.length; i += 1) {
        fs.copyFile(path.resolve(oldPathAssets, data[i]), path.resolve(newPathAssets, data[i]), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});
let pathes = [];
const files2 = dir.readdir(newPathAssets);
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
            fs.unlink(path.resolve(newPathAssets, pathes[i]), (err) => {
                if (err) throw err;
            });
        }
    });
});

/* Создание стиля */

let newfile = new fs.WriteStream(pathCss);
pathCss = path.resolve(__dirname, "./styles");
files = dir.readdir(pathCss);
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

/* создание html файла */
newfile = new fs.WriteStream(pathHtml);
pathHtml = path.resolve(__dirname, "./components");
pathHtml1 = path.resolve(__dirname, "template.html");

let text = ""
file = new fs.ReadStream(pathHtml1);
file.on('readable', function () {
    let data;    
    while ((data = file.read()) != null) 
    {
        text+="\n"+data;
    }
});

files = dir.readdir(pathHtml);
files.then(function file(data) {
    let res = "";
    for (let i = 0; i < data.length; i++) {
        fs.stat(path.resolve(pathHtml, data[i]), function (err, stats) {
            if (stats.isFile() && path.extname(data[i]) === '.css') {
                let tempData;
                let fileTemp = new fs.ReadStream(path.resolve(pathHtml, data[i]));
                fileTemp.on('readable', function () {
                    while ((dataTemp = fileTemp.read()) != null) {
                        tempData+=dataTemp;
                    }
                });
                text.replace("{{"+path.basename(data[i].name, path.extname(data[i].name))+"}}", tempData);
            }
        });
    };
});

newfile.write(text);