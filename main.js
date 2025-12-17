var roleHarvester = require("role.harvester");
var roleBuilder = require("role.builder");
var roleRepair = require("role.repair");
var roleHealer = require("role.healer");

var acfFunctions = require("acfFunctions");

module.exports.loop = function () {
  var creepsquantity = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS).length;
  var emerg = false;
  // INICIO SPAWNS
  if (creepsquantity < 12) {
    emerg = true;
    for (var i = 0; i <= 4; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Worker" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 200
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK], "Worker" + i, {
          memory: { role: "Worker" },
        });
        break;
      }
    }
    for (var i = 0; i <= 1; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Builder" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 200
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK], "Builder" + i, {
          memory: { role: "Builder" },
        });
        break;
      }
    }
    for (var i = 0; i <= 3; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Repair" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 200
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK], "Repair" + i, {
          memory: { role: "Repair", target: [null, 0] },
        });
        break;
      }
    }
    for (var i = 0; i < 1; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Healer" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 300
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, HEAL], "Healer" + i, {
          memory: { role: "Healer" },
        });
        break;
      }
    }
  }
  // FIM SPAWNS

  // INICIO CREEP ROLES
  var cancelarOutras = false;
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.ticksToLive < 200) {
      cancelarOutras = true;
      if (Game.spawns["Spawn1"].renewCreep(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(14, 38);
      } else if (
        Game.spawns["Spawn1"].renewCreep(creep) == ERR_NOT_ENOUGH_ENERGY &&
        creep.store["energy"] > 0
      ) {
        creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);
        Game.spawns["Spawn1"].renewCreep(creep);
      }
      continue;
    }

    if (creep.memory.role == "Worker") {
      roleHarvester.trabalhar(creep);
      if (cancelarOutras) {
        continue;
      }
    } else if (creep.memory.role == "Builder") {
      roleBuilder.trabalhar(creep, emerg);
    } else if (creep.memory.role == "Healer") {
      roleHealer.trabalhar(creep);
    } else {
      roleRepair.trabalhar(creep, emerg);
    }
  }
  // FIM CREEP ROLES

  // INICIO TOWER ROLES
  var estruturas = creep.room.find(FIND_MY_STRUCTURES, {
    filter: (object) => object.structureType == "tower",
  });
  for (var torre in estruturas) {
    acfFunctions.torreRepair(estruturas[torre]);
  }
  // FIM TOWER ROLES
};
