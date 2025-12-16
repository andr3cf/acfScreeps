const clamp = (num, min, max) => Math.min(max, Math.max(min, num));

function minerarHarvester(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (
    creep.name == "Worker2" ||
    creep.name == "Worker3" ||
    creep.name == "Worker4"
  ) {
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  } else {
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1]);
    }
  }
}

function minerarBuilder(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0]);
  }
}

function storeEnergy(creep) {
  if (
    creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
  ) {
    creep.moveTo(Game.spawns["Spawn1"]);
  }
}

function fullWithdraw(creep) {
  var freecap = creep.store.getFreeCapacity();
  if (
    creep.withdraw(Game.spawns["Spawn1"], RESOURCE_ENERGY, freecap) ==
    ERR_NOT_IN_RANGE
  ) {
    creep.moveTo(16, 38);
  }
}

function reparar(creep) {
  var structure = Game.getObjectById(creep.memory.target);
  if (creep.repair(structure) == ERR_NOT_ENOUGH_RESOURCES) {
    fullWithdraw(creep);
  } else if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
    creep.moveTo(structure);
  }
}

var acfFunctions = {
  mineracao(creep) {
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.memory.role == "Worker") {
        minerarHarvester(creep);
      } else if ("Builder") {
        minerarBuilder(creep);
      }
    } else {
      storeEnergy(creep);
    }
  },

  construirMaisProximo(creep) {
    var constructionSites = creep.pos.findClosestByPath(
      FIND_MY_CONSTRUCTION_SITES
    );

    if (constructionSites == null || constructionSites == undefined) {
      creep.moveTo(22, 35);
      return;
    }

    if (creep.build(constructionSites) == ERR_NOT_ENOUGH_RESOURCES) {
      fullWithdraw(creep);
    } else if (creep.build(constructionSites) == ERR_NOT_IN_RANGE) {
      if (creep.store.getFreeCapacity() > 0) {
        fullWithdraw(creep);
      } else {
        creep.moveTo(constructionSites);
      }
    }
  },

  repararController(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    } else if (
      creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_RESOURCES
    ) {
      fullWithdraw(creep);
    }
  },

  repararClosest(creep) {
    if (creep.memory.target != null) {
      var estrutura = Game.getObjectById(creep.memory.target);
      //console.log('Achou='+estrutura);
      if (estrutura == null) {
        creep.memory.target = null;
        return;
      }
      if (estrutura.hits >= clamp(estrutura.hitsMax, 0, 10000)) {
        creep.memory.target = null;
      } else {
        reparar(creep);
      }
    } else {
      var structureTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (object) => object.hits < clamp(object.hitsMax / 4, 0, 1000),
      });
      //console.log('AchouNovo='+structureTarget);
      if (structureTarget == null) {
        creep.memory.target = null;
        creep.moveTo(18, 31);
      } else {
        creep.memory.target = structureTarget.id;
      }
    }
  },
};

module.exports = acfFunctions;
