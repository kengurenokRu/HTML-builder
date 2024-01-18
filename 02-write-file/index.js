console.log("Приветствую тебя, путник!");
console.log("Что желаешь записать в файл?");

const path = require('node:path');
const fs = require('node:fs');
const file = new fs.WriteStream(path.format({ dir: __dirname, base: '02-write-file', ext: ".txt"}));
/*let str = "";
while (str!= "exit" || str != "ctrl + c")
{

}*/
