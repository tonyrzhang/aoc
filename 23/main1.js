var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var instructions = [];
var registers = {a: 0, b: 0};

rd.on('line', function(line) {
	var parts = line.split(' ');
	var command = {name: parts[0]};
	if (command.name === 'jmp') {
		command.destination = parseInt(parts[1]);
	}
	else if (command.name === 'jie' || command.name === 'jio') {
		command.register = parts[1].substring(0, parts[1].length - 1);
		command.destination = parseInt(parts[2]);
	}
	else {
		command.register = parts[1];
	}
	instructions.push(command);
});

rd.on('close', function(){
	var i = 0;
	while (i < instructions.length && i > -1) {
		var instruction = instructions[i];
		var name = instruction.name;
		if (name === 'hlf') {
			registers[instruction.register] /= 2;
			i++;
		}
		else if (name === 'tpl') {
			registers[instruction.register] *= 3;
			i++;
		}
		else if (name === 'inc') {
			registers[instruction.register] += 1;
			i++;
		}
		else if (name === 'jmp') {
			i += instruction.destination;
		}
		else if (name === 'jie') {
			if (registers[instruction.register] % 2 === 0) {
				i += instruction.destination;
			}
			else {
				i++;
			}
		}
		else if (name === 'jio') {
			if (registers[instruction.register] === 1) {
				i += instruction.destination;
			}
			else {
				i++;
			}
		}
	}
	console.log(registers);
});
