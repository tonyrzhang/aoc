var fs = require('fs'),
    readline = require('readline'),
    Combinatorics = require('js-combinatorics');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var packages = [];

rd.on('line', function(line) {
  packages.push(parseInt(line));
});

rd.on('close', function() {
  var total = packages.reduce(function(a, b){
    return a + b;
  });
  var part = total / 4;
  var i = 1;
  var combinations = [];
  while (i < packages.length && combinations.length < 1) {
    console.log(i);
    combinations = Combinatorics.combination(packages, i).toArray().filter(function (a) {
      return a.reduce(function(b, c){
        return b + c;
      }) === part;
    });
    i++;
  }
  var retVal = [];
  for (var j = 0; j < combinations.length; j++) {
    retVal.push(combinations[j].reduce(function(a, b) {
      return a * b;
    }));
  }
  retVal.sort(function(a,b){
    return a - b;
  })
  console.log(retVal[0]);
});
