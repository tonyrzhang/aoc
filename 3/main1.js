fs = require('fs');

fs.readFile('input', 'utf8', function(error, data){
	var visitedSquares = {};
	var currentX = 0;
	var currentY = 0;

	function getLookupKey(){
		return currentX + "," + currentY;
	}

	function updateVisitedSquares() {
		var key = getLookupKey();
		visitedSquares[key] = true;
	}

	updateVisitedSquares();

	for(var i = 0; i < data.length; i++) {
		var direction = data[i];
		if (direction === '>') {
			currentX++;
			updateVisitedSquares();
		}
		else if (direction === '<') {
			currentX--;
			updateVisitedSquares();
		}
		else if (direction === '^') {
			currentY++;
			updateVisitedSquares();
		}
		else if (direction === 'v') {
			currentY--;
			updateVisitedSquares();
		}
	}
	console.log(Object.keys(visitedSquares).length);
});
