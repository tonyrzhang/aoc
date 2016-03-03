fs = require('fs');

fs.readFile('input', 'utf8', function(error, data){
	var up = 0;
	var down = 0;
	for(var i = 0; i < data.length; i++) {
		var direction = data[i];
		if (direction === ')') {
			down++;
		}
		else if (direction === '(') {
			up++;
		}
	}
	console.log(up - down);
});
