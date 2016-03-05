var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var normal = 0;
var encoded = 0;

rd.on('line', function(line) {
	encoded += JSON.stringify(line).length;
	normal += line.length;
});

rd.on('close', function(){
	console.log(encoded - normal);
});
