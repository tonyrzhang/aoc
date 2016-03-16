var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var sum = 0;
var vowels = "aeiou";

function isNice(word) {
  return hasVowels(word) && hasDoubles(word) && noBadWords(word);
}

function hasVowels(word) {
  var vowelCount = 0;
  for (var i = 0; i < word.length; i++) {
    var char = word[i];
    if(vowels.indexOf(char) >= 0) {
        vowelCount++;
        if (vowelCount >= 3) {
          return true;
        }
    }
  }
  return false;
}

function hasDoubles(word) {
  for(var i = 0; i < word.length - 1; i++) {
    if(word[i] === word[i + 1]) {
      return true;
    }
  }
  return false;
}

function noBadWords(word) {
  return word.indexOf('ab') === -1 && word.indexOf('cd') === -1 && word.indexOf('pq') === -1 && word.indexOf('xy') === -1;
}

rd.on('line', function(line) {
  if(isNice(line)){
    sum++;
  }
});

rd.on('close', function(){
  console.log(sum);
});
