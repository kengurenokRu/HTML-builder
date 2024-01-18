const path = require('node:path');
const fs = require('node:fs');
const file = new fs.ReadStream(path.format({ dir: __dirname, base: 'text.txt' }));
let count = 0;
file.on('readable', function () {
    let data;    
    while ((data = file.read()) != null) 
    {
        console.log(String(data));
        count++;        
    }
    if (count == 0) console.log("Файл пуст");
});