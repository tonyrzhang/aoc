var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var weapons =  [[8, 4, 0], [10, 5, 0], [25, 6, 0], [40, 7, 0], [74, 8, 0]],
    armors = [[13, 0, 1], [31, 0, 2], [53, 0, 3], [75, 0, 4], [102, 0, 5], [0, 0, 0]],
    rings = [[25, 1, 0], [50, 2, 0], [100, 3, 0], [20, 0, 1], [40, 0, 2], [80, 0, 3], [0, 0, 0], [0, 0, 0]],
    boss = {},
    min = Number.MAX_VALUE;

function playerWinsFight(attack, defense) {
  var playerAttacks = Math.ceil(boss.hp / Math.max(attack - boss.armor, 1));
  var bossAttacks = Math.ceil(100 / Math.max(boss.damage - defense, 1));

  return playerAttacks <= bossAttacks;
}
function simulate(weapon, armor, ring1, ring2) {
  var attack = weapon[1] + ring1[1] + ring2[1];
  var defense = armor[2] + ring1[2] + ring2[2];
  var gold = weapon[0] + armor[0] + ring1[0] + ring2[0];
  if(playerWinsFight(attack, defense) && gold < min) {
    min = gold;
  }
}

rd.on('line', function(line) {
  var parts = line.split(' ');
  if(line.indexOf('Hit') > -1) {
    boss.hp = parseInt(parts[2]);
  }
  else if(line.indexOf('Damage') > -1) {
    boss.damage = parseInt(parts[1]);
  }
  else if(line.indexOf('Armor') > -1) {
    boss.armor = parseInt(parts[1]);
  }
});

rd.on('close', function(){
  for (var w in weapons) {
    for (var a in armors) {
      for (var r1 = 0; r1 < rings.length; r1++) {
        for (var r2 = r1 + 1; r2 < rings.length; r2++) {
          simulate(weapons[w], armors[a], rings[r1], rings[r2]);
        }
      }
    }
  }
  console.log(min);
});
