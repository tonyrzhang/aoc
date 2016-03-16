var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var packages = [];
var row;
var column;

rd.on('line', function(line) {
	var parts = line.split(' ');
	row = parseInt(parts[15].substring(0, parts[15].length - 1));
	column = parseInt(parts[17].substring(0, parts[17].length -1));
});

rd.on('close', function() {
	var currentValue = 20151125;
	var multiplier = 252533;
	var modulus = 33554393;
	var x = 1;
	var y = 1;

	while (true) {
		if (y === 1) {
			y = x + 1;
			x = 1;
		}
		else {
			y--;
			x++;
		}
		currentValue = (currentValue * multiplier) % modulus;

		if (x === column && y === row) {
			console.log(currentValue);
			break;
		}
	}
});
