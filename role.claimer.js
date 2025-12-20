const acfFunctions = require("./acfFunctions");

const nomeRoomBase = "W4N9";
const nomeRoomClaim = "W5N9";

var roleClaimer = {
  trabalhar(creep) {
    if (creep.room.name == nomeRoomBase) {
      var exit = creep.pos.findClosestByPath(FIND_EXIT_LEFT);
      creep.moveTo(exit);
    } else if (creep.room.name == nomeRoomClaim) {
      var controller = creep.room.find(FIND_STRUCTURES, {
        filter: (objeto) =>
          objeto.structureType == "controller" && objeto.owner != "andr3cf",
      });
      if (creep.claimController(controller[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller[0]);
      }
    }
  },
};

module.exports = roleClaimer;
