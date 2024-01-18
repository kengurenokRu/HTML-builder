const path = require('node:path'); 
const fs = require('node:fs');
const file = new fs.ReadStream(path.format({dir: __dirname,base: 'text.txt'}));

file.on('readable', function() {
    let data = file.read();
    if (data !== null )
    console.log(String(data));
else 
console.log("Данных нет");
});