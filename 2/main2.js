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
  parts.sort(function (a, b) {
    return a - b;
  });
  var wrap = 2 * parts[0] + 2 * parts[1];
  var bow = parts[0] * parts[1] * parts[2];

  sum += (wrap + bow);
});

rd.on('close', function(){
  console.log(sum);
});
