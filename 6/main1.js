var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var grid = [];
for(var i = 0; i < 1000; i++) {
  grid.push([]);
  for(var j = 0; j < 1000; j++) {
    grid[i].push(false)
  }
}

function getXY(text) {
  var temp = text.split(',');
  return {x: parseInt(temp[0]), y: parseInt(temp[1])};
}

function helper(start, end, action) {
  var pStart = getXY(start);
  var pEnd = getXY(end);

  for(var i = pStart.x; i <= pEnd.x; i++) {
    for(var j = pStart.y; j <= pEnd.y; j++) {
      if (action === 'on') {
        grid[i][j] = true;
      }
      else if (action === 'toggle') {
        grid[i][j] = !grid[i][j];
      }
      else if (action === 'off') {
        grid[i][j] = false;
      }
    }
  }
}

rd.on('line', function(line) {
  var splitWords = line.split(' ');
  if (line.indexOf('turn on') == 0) {
    helper(splitWords[2], splitWords[4], 'on');
  }
  else if (line.indexOf('toggle') == 0) {
    helper(splitWords[1], splitWords[3], 'toggle');
  }
  else if (line.indexOf('turn off') == 0) {
    helper(splitWords[2], splitWords[4], 'off');
  }
});

rd.on('close', function(){
  var sum = 0;
  for(var i = 0; i < 1000; i++) {
    for(var j = 0; j < 1000; j++) {
      if (grid[i][j]) {
        sum++;
      }
    }
  }
  console.log(sum);
});
