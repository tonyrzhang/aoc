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

function updatePoints() {
  var list = [];
  for (var deer in map) {
    list.push({name: map[deer].name, distance: map[deer].distance});
  }

  list.sort(function(a, b){
    return b.distance - a.distance;
  });

  for (var i = 0; i < list.length; i++) {
    if (list[0].distance === list[i].distance) {
        map[list[i].name].points++;
    }
  }
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
    timeInCurrentState: 0,
    points: 0
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
    updatePoints();
    time++;
  }

  for(var reindeer in map) {
    retVal.push(map[reindeer].points);
  }

  console.log(Math.max.apply(Math, retVal));
});
