var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var sum = 0;

function traverse(node) {
	if (Array.isArray(node)) {
		for (var i = 0; i < node.length; i++) {
			traverse(node[i]);
		}
	}
	else if (typeof node === 'object') {
		for(var property in node) {
			if(node[property] === 'red') {
				return;
			}
		}
		for(var property in node) {
			traverse(node[property]);
		}
	}
	else if (!isNaN(node)) {
		sum += node;
	}
}

rd.on('line', function(line) {
	var input = JSON.parse(line);
	traverse(input);
	console.log(sum);
});
