var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var sum = 0;

rd.on('line', function(line) {
	var parts = line.split('x');
	var length = parts[0];
	var width = parts[1];
	var height = parts[2];

	var first = 2 * length * width;
	var second = 2 * width * height;
	var third = 2 * height * length;
	var extra = Math.min(first/2, second/2, third/2);

	sum += (first + second + third + extra);
});

rd.on('close', function(){
	console.log(sum);
});
