var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var grid = [];
// var emptyRow = [];
// for (var i = 0; i < 102; i++) {
// 	emptyRow.push({state: false, dead: true});
// }
// grid.push(emptyRow);

function findLitNeighbors(i ,j) {
	var sum = 0;
	var rightSide = i === 99;
	var leftSide = i === 0;
	var topSide = j === 0;
	var bottomSide = j === 99;

	if (!leftSide && !topSide && grid[i - 1][j - 1]) {
		sum++;
	}

	if (!topSide && grid[i][j - 1]) {
		sum++;
	}

	if (!rightSide && !topSide && grid[i + 1][j - 1]) {
		sum++;
	}

	if (!leftSide && grid[i - 1][j]) {
		sum++;
	}

	if (!rightSide && grid[i + 1][j]) {
		sum++;
	}

	if (!leftSide && !bottomSide && grid[i - 1][j + 1]) {
		sum++;
	}

	if (!bottomSide && grid[i][j + 1]) {
		sum++;
	}

	if (!rightSide && !bottomSide && grid[i + 1][j + 1]) {
		sum++;
	}

	return sum;
}

function animate() {
	var newGrid = [];
	for (var i = 0; i < 100; i++) {
		var row = [];
		for(var j = 0; j < 100; j++) {
			var neighborsLit = findLitNeighbors(i, j);
			if (grid[i][j]) {
				if(neighborsLit === 2 || neighborsLit === 3) {
					row.push(true);
				}
				else {
					row.push(false);
				}
			}
			else {
				if (neighborsLit === 3) {
					row.push(true);
				}
				else {
					row.push(false);
				}
			}
		}
		newGrid.push(row)
	}
	grid = newGrid;
	fixLights();
}

function fixLights() {
	grid[0][0] = true;
	grid[99][0] = true;
	grid[0][99] = true;
	grid[99][99] = true;
}

rd.on('line', function(line) {
	var row = [];
	for (var i = 0; i < line.length; i++) {
		var char = line[i];
		if (char === '.') {
			row.push(false);
		}
		else if (char === '#') {
			row.push(true);
		}
	}
	grid.push(row);
});

rd.on('close', function(){
	fixLights();
	for (var i = 0; i < 100; i++) {
		animate();
	}

	var lights = 0;
	for (var i = 0; i < 100; i++) {
		for (var j = 0; j < 100; j++) {
			if (grid[i][j]) {
				lights++;
			}
		}
	}
	console.log(lights);
});
