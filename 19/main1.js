var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var map = {};
var input = '';
var combinations = {};

function findMolecules() {
  for (var i = 0; i < input.length; i++) {
    var char = input[i];
    if (map[char]) {
      var prefix = input.substring(0, i);
      var suffix = input.substring(i + 1);
      for (var j = 0; j < map[char].length; j++) {
        var middle = map[char][j];
        combinations[prefix + middle + suffix] = true;
      }
    }
    else if (i < input.length - 1) {
      var twoChar = input.substring(i, i + 2);
      if (map[twoChar]) {
        var prefix = input.substring(0, i);
        var suffix = input.substring(i + 2);
        for (var j = 0; j < map[twoChar].length; j++) {
          var middle = map[twoChar][j];
          combinations[prefix + middle + suffix] = true;
        }
      }
    }
  }
}

rd.on('line', function(line) {
  var match = /(\w+) => (\w+)/.exec(line);
  if (match) {
    if (!map[match[1]]) {
      map[match[1]] = [];
    }
    map[match[1]].push(match[2]);
  }
  else if(line.length > 0) {
    input = line;
  }
});

rd.on('close', function() {
  findMolecules();
  console.log(Object.keys(combinations).length);
});
