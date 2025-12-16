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
    creep.moveTo(23, 30);
  },
};

module.exports = roleHealer;
