var fs = require('fs'),
    readline = require('readline'),
    Combinatorics = require('js-combinatorics');


var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var list = [];
var retVal = {};

function solve (permutation) {
  var sum = 0;
  for (var i = 0; i < permutation.length; i++) {
    sum += permutation[i];
  }
  if (sum === 150) {
    var key = permutation.length.toString();
    if (!retVal[key]) {
      retVal[key] = 1;
    }
    else {
      retVal[key]++;
    }
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

  var sorted = Object.keys(retVal).sort(function(a, b){
    return a - b;
  });

  console.log(retVal[sorted[0]]);
});
