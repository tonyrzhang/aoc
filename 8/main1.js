var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var normal = 0;
var decoded = 0;

rd.on('line', function(line) {
	decoded += eval(line).length;
	normal += line.length;
});

rd.on('close', function(){
	console.log(normal - decoded);
});
