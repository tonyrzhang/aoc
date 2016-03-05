var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

function lookAndSay(input) {
	var retVal = "";
	var lastChar = input[0];
	var lastCharCount = 1;
	for (var i = 1; i < input.length; i++) {
		var currentChar = input[i];
		if (currentChar !== lastChar) {
			retVal = retVal + lastCharCount + lastChar;
			lastChar = currentChar;
			lastCharCount = 1;
		} else {
			lastCharCount++;
		}
	}

	retVal = retVal + lastCharCount + lastChar;

	return retVal;
}

rd.on('line', function(line) {
	var word = line;
	for (var i = 0; i < 50; i++) {
		word = lookAndSay(word);
	}

	console.log(word.length);
});
