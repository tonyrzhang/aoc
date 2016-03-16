var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var map = {};

function simulateReindeer(name, duration) {
  var state = map[name];
  if(state.isResting) {
    if (state.timeInCurrentState === state.rest) {
      state.timeInCurrentState = 0;
      state.isResting = false;
    }
  }
  else {
    if (state.timeInCurrentState === state.duration) {
      state.timeInCurrentState = 0;
      state.isResting = true;
    }
  }

  if(!state.isResting) {
    state.distance += state.speed;
  }

  state.timeInCurrentState++;
}

rd.on('line', function(line) {
  var parts = line.split(" ");
  var state = {
    speed: parseInt(parts[3]),
    name: parts[0],
    duration: parseInt(parts[6]),
    rest: parseInt(parts[13]),
    distance: 0,
    isResting: false,
    timeInCurrentState: 0
  };
  map[state.name] = state;
});

rd.on('close', function(){
  var time = 0;
  var retVal = [];
  while (time < 2503) {
    for (var reindeer in map) {
      simulateReindeer(reindeer);
    }
    time++;
  }

  for(var reindeer in map) {
    retVal.push(map[reindeer].distance);
  }

  console.log(Math.max.apply(Math, retVal));
});
