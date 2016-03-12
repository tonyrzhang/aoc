var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var map = {};
var target = '';
var sum = 0;

function findMolecules() {
  while (target !== 'e') {
    var keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      for (var j = 0; j < map[key].length; j++) {
        var replacement = map[key][j];
        if (target.indexOf(key) > -1) {
          target = target.replace(key, replacement);
          sum++;
        }
      }
    }
  }
}

rd.on('line', function(line) {
  var match = /(\w+) => (\w+)/.exec(line);
	if (match) {
		if (!map[match[2]]) {
			map[match[2]] = [];
		}
		map[match[2]].push(match[1]);
	}
	else if(line.length > 0) {
		target = line;
	}
});

rd.on('close', function() {
	findMolecules();
	console.log(sum);
});
