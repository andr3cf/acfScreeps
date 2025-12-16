var roleHarvester = require("role.harvester");
var roleBuilder = require("role.builder");
var roleRepair = require("role.repair");
var roleHealer = require("role.healer");

var tick = 0;

module.exports.loop = function () {
  //console.log('Tick: ' + tick);
  //console.log('Energia: ' + Game.spawns['Spawn1'].room.energyAvailable);
  //tick++;
  var creepsquantity = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS).length;
  var emerg = false;
  if (creepsquantity < 14) {
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
    for (var i = 0; i <= 3; i++) {
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
    for (var i = 0; i <= 1; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Healer" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 300
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, HEAL], "Healer" + i, {
          memory: { role: "Healer" },
        });
        break;
      }
    }
  }
  var cancelarOutras = false;
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.ticksToLive < 200) {
      cancelarOutras = true;
      if (creep.memory.role == "Worker") {
        creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);
      }
      if (Game.spawns["Spawn1"].renewCreep(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns["Spawn1"]);
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
}; // SEPARAR POR CLASSES DE TRABALHADOR
