const acfFunctions = require("acfFunctions");

var roleArcher = {
  trabalhar(creep, emerg) {
    // if (emerg) {
    //   acfFunctions.mineracao(creep);
    //   return;
    // }

    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    if (hostiles == []) {
      return;
    }
    if (creep.rangedAttack(hostiles[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(hostiles[1]);
    }
  },
};

module.exports = roleArcher;
