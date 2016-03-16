var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('input'),
  output: process.stdout,
  terminal: false
});

var boss = {},
    spells = {
      mm: {
        cost: 53,
        damage: 4
      },
      drain: {
        cost: 73,
        damage: 2,
        heal: 2
      },
      shield: {
        cost: 113,
        duration: 6,
        armor: 7
      },
      poison: {
        cost: 173,
        duration: 6,
        damage: 3
      },
      recharge: {
        cost: 229,
        duration: 5,
        regen: 101
      }
    },
    min = Number.MAX_VALUE;

function isBossDead(state) {
  return state.boss < 1;
}

function isPlayerDead(state) {
  return state.player.hp < 1;
}

function simulate(state) {
  // handle effects
  handleEffects(state);

  // check if the boss died
  if (isBossDead(state)) {
    if (state.manaUsed < min) {
      min = state.manaUsed;
    }
    return;
  }

  // check if we have mana to cast anything
  if (state.player.mana < 53) {
    return;
  }

  for (var spellName in spells) {
    var s = JSON.parse(JSON.stringify(state));
    var spell = spells[spellName];

    // check if the spell we are casting is an effect spell
    // that is already cast
    if (spell.duration && s.effects[spellName] > 0) {
      continue;
    }

    // check if we can cast this spell
    if (s.player.mp >= spell.cost) {
      s.player.mp -= spell.cost;
      s.manaUsed += spell.cost;

      if (spell.duration) {
        s.effects[spellName] = spell.duration;
      }
      else if (spellName === 'drain') {
        s.boss -= spell.damage;
        s.player.hp += spell.heal;
      }
      else if (spellName === 'mm') {
        s.boss -= spell.damage;
      }

      // check if boss died
      if (isBossDead(s)) {
        if (s.manaUsed < min) {
          min = s.manaUsed;
        }
        return;
      }

      // start bosses turn
      // handle effects
      handleEffects(s);

      // check if boss died
      if (isBossDead(s)) {
        if (s.manaUsed < min) {
          min = s.manaUsed;
        }
        return;
      }

      // boss attacks
      var hasArmor = s.effects.shield > 0;
      s.player.hp -= Math.max(boss.damage - (hasArmor ? spells['shield'].armor : 0), 1);

      // check if player died
      if (isPlayerDead(s)) {
        return;
      }

      // recurse for the next turn
      simulate(s);
    }
  }


}

function handleEffects(state) {
  for (var effect in state.effects) {
    if (state.effects[effect] > 0) {
      if(spells[effect].damage) {
        state.boss-=spells[effect].damage;
      }
      else if (spells[effect].regen) {
        state.player.mp += spells[effect].regen;
      }
      state.effects[effect]--;
    }
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
});

rd.on('close', function(){
  simulate({
    effects: {shield: 0, poison: 0, recharge: 0},
    boss: boss.hp,
    player: {hp: 50, mp: 500},
    manaUsed: 0
  });
  console.log(min);
});
