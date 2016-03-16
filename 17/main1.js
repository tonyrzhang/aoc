var fs = require('fs'),
    readline = require('readline'),
    Combinatorics = require('js-combinatorics');


var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var list = [];
var count = 0;

function solve (permutation) {
  var sum = 0;
  for (var i = 0; i < permutation.length; i++) {
    sum += permutation[i];
  }
  if (sum === 150) {
    count++;
  }
}

rd.on('line', function(line) {
  list.push(parseInt(line));
});

rd.on('close', function(){
  var permutations = Combinatorics.power(list).toArray();
  for (var i = 0; i < permutations.length; i++) {
    solve(permutations[i]);
  }
  console.log(count);
});
