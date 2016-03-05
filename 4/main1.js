var fs = require('fs'),
    readline = require('readline'),
		md5 = require('md5');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

rd.on('line', function(line) {
	var i = 0;
	while (true) {
		if (md5(line + i).indexOf('00000')===0){
			console.log(i);
			break;
		}
		i++;
	}
});
