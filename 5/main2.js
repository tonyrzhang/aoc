var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var sum = 0;

function isNice(word) {
  return hasPairs(word) && hasNeightbor(word);
}

function hasPairs(word) {
  for (var i = 0; i < word.length - 1; i++) {
    var pair = word.substring(i, i + 2);
    var parts = word.split(pair);
    if (parts.length > 2) {
      return true;
    }
  }
  return false;
}

function hasNeightbor(word) {
  for(var i = 0; i < word.length - 2; i++) {
    if(word[i] === word[i+2]){
      return true;
    }
  }
  return false;
}

rd.on('line', function(line) {
  if(isNice(line)){
    sum++;
  }
});

rd.on('close', function(){
  console.log(sum);
});
