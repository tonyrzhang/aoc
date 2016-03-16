var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

function generateWords (input) {
  var word = input;
  do {
    word = incrementWord(word, word.length - 1);
  } while (!isValid(word));

  return word;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function incrementWord(input, digit) {
    var word = input.slice(0);
    var charCode = word[digit].charCodeAt(0) + 1;
    if (charCode > 122) {
      word = setCharAt(word, digit, 'a');
      return incrementWord(word, digit - 1);
    }

    var x = String.fromCharCode(charCode);
    word = setCharAt(word, digit, x);
    return word;
}

function isValid (input) {
  return satisfiesStraight(input) && satisfiesBadLetters(input) && satisfiesDoubles(input);
}

function satisfiesStraight(input) {
  for (var i = 0; i < input.length - 2; i++) {
    if(input[i].charCodeAt(0) + 1 === input[i + 1].charCodeAt(0) && input[i].charCodeAt(0) + 2 === input[i + 2].charCodeAt(0)) {
      return true;
    }
  }
  return false;
}

function satisfiesBadLetters(input) {
  if (input.indexOf('i') >= 0 || input.indexOf('o') >= 0 || input.indexOf('l') >= 0 ){
    return false;
  }
  return true;
}

function satisfiesDoubles(input) {
  var hasDoubles = false;
  var doubleChar ='';
  for (var i = 0; i < input.length - 1; i++) {
    if(input[i] === input[i + 1]) {
      if (hasDoubles && input[i] !== doubleChar) {
        return true;
      }
      doubleChar = input[i];
      hasDoubles = true;
    }
  }

  return false;
}

rd.on('line', function(line) {
  console.log(generateWords(line));
});
