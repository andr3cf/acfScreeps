var roleArcher = {
  trabalhar(creep) {
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
      filter: (hostil) => hostil.body.some((part) => part.type === HEAL),
    });

    if (hostiles.length === 0) {
      hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    }

    if (hostiles.length === 0 || hostiles == undefined || hostiles == null) {
      creep.moveTo(10, 34);
      return;
    }

    if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(hostiles[0]);
    }
  },
};

module.exports = roleArcher;
