var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var sues = [];
var aunt = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

rd.on('line', function(line) {
  var match = /(\w+): (\w+): (-?\d+), (\w+): (-?\d+), (\w+): (-?\d+)/.exec(line);
  var sue = {};
  sue[match[2]] = parseInt(match[3]);
  sue[match[4]] = parseInt(match[5]);
  sue[match[6]] = parseInt(match[7]);
  sues.push(sue);
});

rd.on('close', function(){
  for (var i = 0; i < sues.length; i++) {
    var sue = sues[i];
    var passes = true;
    for (var key in sue) {
      if (sue[key] !== aunt[key]) {
        passes = false;
        break;
      }
    }
    if (passes) {
      console.log(i + 1)
      return;
    }
  }
});
