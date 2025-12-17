const acfFunctions = require("./acfFunctions");

var roleHealer = {
  trabalhar(creep) {
    var creeplist = creep.room.find(FIND_MY_CREEPS);
    for (var creepy in creeplist) {
      if (creepy.hits < creepy.hitsMax / 2) {
        if (creep.heal(creepy) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creepy);
        }
        return;
      }
    }
    var estruturas = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (object) => object.structureType == "tower",
    });
    for (var torre in estruturas) {
      if (estruturas[torre].store.getFreeCapacity("energy") > 0) {
        if (acfFunctions.abastecer(creep, estruturas[torre]) == 0) {
          return;
        }
        break;
      } else {
        continue;
      }
    }
    creep.moveTo(23, 30);
  },
};

module.exports = roleHealer;
