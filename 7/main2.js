var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var map = {};
var newMap = {};

function AND(x, y) {
	return x & y;
}

function OR(x, y) {
	return x | y;
}

function LEFT(x, y) {
	return x << y;
}

function RIGHT(x, y) {
	return x >> y;
}

function COMPLEMENT(x) {
	return ~x;
}

function ASSIGN(x, y) {
	return +x;
}

function isANumber(x) {
	return !isNaN(x);
}

function findVariable(input) {
	var stringValue = newMap[input] ? newMap[input] : solve(input);
	return stringValue;
}

function solve(key) {
	if (isANumber(key)){
		return key;
	}
	var operation = map[key];
	var variables = operation.split(' ');
	var out;

	if (operation.indexOf('AND') >= 0) {
		var x = findVariable(variables[0]);
		var y = findVariable(variables[2]);
		out = AND(x, y);
	}
	else if (operation.indexOf('OR') >= 0) {
		var x = findVariable(variables[0]);
		var y = findVariable(variables[2]);
		out = OR(x, y);
	}
	else if (operation.indexOf('LSHIFT') >= 0) {
		var x = findVariable(variables[0]);
		var y = findVariable(variables[2]);
		out = LEFT(x, y);
	}
	else if (operation.indexOf('RSHIFT') >= 0) {
		var x = findVariable(variables[0]);
		var y = findVariable(variables[2]);
		out = RIGHT(x, y);
	}
	else if (operation.indexOf('NOT') >= 0) {
		var x = findVariable(variables[1]);
		out = COMPLEMENT(x);
	}
	else {
		var x = findVariable(variables[0]);
		out = ASSIGN(x);
	}

	newMap[key] = out.toString();
	return out;
}

rd.on('line', function(line) {
	var parts = line.split(' -> ');
	var operation = parts[0];
	var destination = parts[1];
	map[destination] = operation;
});

rd.on('close', function(){
	newMap['b'] = 956;
	console.log(solve('a'));
});
