fs = require('fs');

fs.readFile('input', 'utf8', function(error, data){
  var current = 0

  for(var i = 0; i < data.length; i++) {
    var direction = data[i];
    if (direction === ')') {
      current--;
    }
    else if (direction === '(') {
      current++;
    }

    if (current === -1) {
      console.log(i + 1);
      break;
    }
  }
});
