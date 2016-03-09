var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
	terminal: false
});

var map = {};

rd.on('line', function(line) {
  var match = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/.exec(line);
  map[match[1]] = {
	  name:       match[1],
	  capacity:   parseInt(match[2]),
	  durability: parseInt(match[3]),
	  flavor:     parseInt(match[4]),
	  texture:    parseInt(match[5]),
	  calories:   parseInt(match[6])
  };
});

rd.on('close', function(){
	var sprinkles = map["Sprinkles"];
	var butterscotch = map["Butterscotch"];
	var chocolate = map["Chocolate"];
	var candy = map["Candy"];
	var maxScore = -1;

	for (var i = 0; i < 100; i++) {
		for (var j = 0; j < 100 - i; j++) {
			for (var k = 0; k < 100 - i - j; k++) {
				var l = 100 - k - j - i;
				var capacity = Math.max(0, sprinkles.capacity * i + butterscotch.capacity * j + chocolate.capacity * k + candy.capacity * l);
				var durability = Math.max(0, sprinkles.durability * i + butterscotch.durability * j + chocolate.durability * k + candy.durability * l);
				var flavor = Math.max(0, sprinkles.flavor * i + butterscotch.flavor * j + chocolate.flavor * k + candy.flavor * l);
				var texture = Math.max(0, sprinkles.texture * i + butterscotch.texture * j + chocolate.texture * k + candy.texture * l);
				var calories = sprinkles.calories * i + butterscotch.calories * j + chocolate.calories * k + candy.calories * l;
				var score = capacity * durability * flavor * texture;

				if (score > maxScore && calories === 500) {
					maxScore = score;
				}
			}
		}
	}
	console.log(maxScore);
});
