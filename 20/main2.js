var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var house = {};
var numberOfPresents;

function simulateElves() {
  for (var i = 1; i < numberOfPresents/10; i++) {
    var count = 0;
    for(var elf = i; elf < numberOfPresents/10; elf += i) {
      if (count < 50) {
        if(!house[elf]) {
          house[elf] = 0;
        }
        house[elf] += (i * 11);
        count++;
      }
    }
  }
}

rd.on('line', function(line) {
  numberOfPresents = parseInt(line);
  simulateElves();
  for(var i = 1; i < numberOfPresents/10; i++) {
    if(house[i] >= numberOfPresents) {
      console.log(i);
      return;
    }
  }
});
