const path = require('node:path');
const dir = require('node:fs').promises;
const fs = require('fs');
let pathCss = path.resolve(__dirname, "./project-dist/style.css");
let pathHtml = path.resolve(__dirname, "./project-dist/index.html");


/*копирование директории assets*/
let oldPathAssets = path.resolve(__dirname, "./assets");
let newPathAssets = path.resolve(__dirname, "./project-dist");
dir.mkdir(newPathAssets, { recursive: true });
newPathAssets = path.resolve(__dirname, "./project-dist/assets");
dir.mkdir(newPathAssets, { recursive: true });
let oldFiles = dir.readdir(newPathAssets, {withFileTypes: true})
oldFiles.then(function del(data)
{    
    for (let i = 0; i < data.length; i++) {        
        let files = dir.readdir(path.resolve(data[i].path, data[i].name), { withFileTypes: true });
        files.then(function file(data2) {
            for (let k=0; k<data2.length; k++)
            {            
            fs.unlink(path.resolve(data2[k].path, data2[k].name), (err) => {
                if (err) throw err;
              });
            }
        });        
      }
});
let folders = dir.readdir(oldPathAssets, { withFileTypes: true });
folders.then(function fild(folder) {
    let folderNameTemp = [];
    for (let k = 0; k <= folder.length - 1; k++) {
        if (folder[k].isDirectory()) {
            folderNameTemp.push(folder[k]);
        }
    }
    for (let k = 0; k <= folderNameTemp.length - 1; k++) {
        dir.mkdir(path.resolve(newPathAssets, folderNameTemp[k].name), { recursive: true });
    }
    for (let k = 0; k <= folderNameTemp.length - 1; k++) {
        let files = dir.readdir(path.resolve(folderNameTemp[k].path, folderNameTemp[k].name), { withFileTypes: true });
        files.then(function file(data) {
            for (let i = 0; i < data.length; i += 1) {
                fs.copyFile(path.resolve(data[i].path, data[i].name), path.resolve(newPathAssets, path.basename(data[i].path), data[i].name), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }

        });
    }
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

pathHtml = path.resolve(__dirname, "./components");
pathHtml1 = path.resolve(__dirname, "template.html");

let text = "";
file = new fs.ReadStream(pathHtml1);
file.on('readable', function () {
    let data;

    while ((data = file.read()) != null) {
        text += "\n" + data;
    }  

files = dir.readdir(pathHtml);
files.then(function file(data) {
    let res = "";
    for (let i = 0; i < data.length; i++) {
        fs.stat(path.resolve(pathHtml, data[i]), function (err, stats) {
            if (stats.isFile() && path.extname(data[i]) === '.html') {
                let tempData = "";
                let fileTemp = new fs.ReadStream(path.resolve(pathHtml, data[i]));
                fileTemp.on('readable', function () {
                    while ((dataTemp = fileTemp.read()) != null) {
                        tempData += dataTemp;
                    }                    
                    text = text.replace("{{" + path.basename(data[i], path.extname(data[i])) + "}}", tempData);                    
                    let newfileHtml = new fs.WriteStream(path.resolve(__dirname, "./project-dist/index.html"));
                    newfileHtml.write(text);  
                });        
            }
        });            
    };    
});
});


