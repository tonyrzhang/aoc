var fs = require('fs'),
    readline = require('readline'),
    Combinatorics = require('js-combinatorics');


var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var map = {};
var min = Number.MAX_VALUE;

function populateMap (start, end, distance) {
  if (!map[start]) {
    map[start] = {};
  }
  map[start][end] = parseInt(distance);
}

function findDistance(permutation) {
  var sum = 0;
  for (var i = 0; i < permutation.length - 1; i++) {
    sum += map[permutation[i]][permutation[i + 1]];
  }
  min = Math.min(min, sum);
}

rd.on('line', function(line) {
  var parts = line.split(" ");
  populateMap(parts[0], parts[2], parts[4]);
  populateMap(parts[2], parts[0], parts[4]);
});

rd.on('close', function(){
  var permutations = Combinatorics.permutation(Object.keys(map)).toArray();
  for (var i = 0; i < permutations.length; i++) {
    findDistance(permutations[i]);
  }
  console.log(min);
});
