fs = require('fs');

fs.readFile('input', 'utf8', function(error, data){
  var visitedSquares = {};
  var santaCurrentX = 0;
  var santaCurrentY = 0;
  var robotCurrentX = 0;
  var robotCurrentY = 0;
  function getLookupKey(isSanta){
    if (isSanta) {
      return santaCurrentX + "," + santaCurrentY;
    }
    else {
      return robotCurrentX + "," + robotCurrentY;
    }
  }

  function moveSanta(direction) {
    if (direction === '>') {
      santaCurrentX++;
      updateVisitedSquares(true);
    }
    else if (direction === '<') {
      santaCurrentX--;
      updateVisitedSquares(true);
    }
    else if (direction === '^') {
      santaCurrentY++;
      updateVisitedSquares(true);
    }
    else if (direction === 'v') {
      santaCurrentY--;
      updateVisitedSquares(true);
    }
  }

  function moveRobot(direction) {
    if (direction === '>') {
      robotCurrentX++;
      updateVisitedSquares(false);
    }
    else if (direction === '<') {
      robotCurrentX--;
      updateVisitedSquares(false);
    }
    else if (direction === '^') {
      robotCurrentY++;
      updateVisitedSquares(false);
    }
    else if (direction === 'v') {
      robotCurrentY--;
      updateVisitedSquares(false);
    }
  }

  function updateVisitedSquares(isSanta) {
    var key = getLookupKey(isSanta);
    visitedSquares[key] = true;
  }

  updateVisitedSquares();

  for(var i = 0; i < data.length; i++) {
    var direction = data[i];
    if (i % 2 === 0) {
      moveSanta(direction);
    }
    else {
      moveRobot(direction);
    }
  }
  console.log(Object.keys(visitedSquares).length);
});
