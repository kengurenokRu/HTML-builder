console.log("Приветствую тебя, путник!");
const path = require('node:path');
const fs = require('node:fs');
const file = new fs.WriteStream(path.format({ dir: __dirname, base: '02-write-file', ext: ".txt"}));
const readline = require('readline'); 
    let text = readline.createInterface(process.stdin, process.stdout);
    text.setPrompt('Что желаешь записать в файл? (признак окончания ввода комбинация клавиш ctrl+c или слово exit)\n');
    text.prompt();
    text.on('line', (input) => {
        if (input != "exit")
        {
            file.write(input);
            file.write("\n");
        }
    else 
    {       
        text.close();        
    }
    });
text.on('close', function()
{
    console.log("Прощай, Путник! Надеюсь, наша совместная работа тебе понравилась");
});
    
 


