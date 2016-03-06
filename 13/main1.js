var fs = require('fs'),
    readline = require('readline'),
		Combinatorics = require('js-combinatorics');


var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var map = {};
var max = 0;

function populateMap (start, sign, distance, end) {
	if (!map[start]) {
		map[start] = {};
	}

	end = end.substring(0, end.length - 1);
	distance = sign === 'gain' ? parseInt(distance) : -1 * parseInt(distance);
	map[start][end] = distance;
}

function findDistance(permutation) {
	var sum = 0;
	for (var i = 0; i < permutation.length - 1; i++) {
		sum += map[permutation[i]][permutation[i + 1]];
		sum += map[permutation[i + 1]][permutation[i]];
	}
	sum += map[permutation[0]][permutation[permutation.length - 1]];
	sum += map[permutation[permutation.length - 1]][permutation[0]];
	max = Math.max(max, sum);
}

rd.on('line', function(line) {
	var parts = line.split(" ");
	populateMap(parts[0],parts[2], parts[3], parts[10]);
});

rd.on('close', function(){
	var permutations = Combinatorics.permutation(Object.keys(map)).toArray();
	for (var i = 0; i < permutations.length; i++) {
		findDistance(permutations[i]);
	}
	console.log(max);
});
