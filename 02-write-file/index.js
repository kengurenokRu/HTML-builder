console.log("Приветствую тебя, путник!");
const path = require('node:path');
const fs = require('node:fs');
const file = new fs.WriteStream(path.format({ dir: __dirname, base: '02-write-file', ext: ".txt"}));
const readline = require('readline');
let text = readline.createInterface(process.stdin, process.stdout);

    text.setPrompt('Что желаешь записать в файл?');
    text.prompt();
    text.on('line', (input) => {
        file.write(input);
        str = input;
        text.close();
    });


 


