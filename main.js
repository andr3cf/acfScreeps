const roleHarvester = require("role.harvester");
const roleBuilder = require("role.builder");
const roleRepair = require("role.repair");
const roleHealer = require("role.healer");
const roleClaimer = require("role.claimer");
const roleUpgrader = require("role.upgrader");
const roleArcher = require("role.archer");
const roleTransporter = require("role.transporter");

const acfFunctions = require("acfFunctions");

module.exports.loop = function () {
  var creepsquantity = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS).length;
  var emerg = false;
  // INICIO SPAWNS
  if (creepsquantity < 20) {
    emerg = true;
    console.log("Emergency!");
    for (var i = 0; i <= 4; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Worker" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 200
      ) {
        Game.spawns["Spawn1"].spawnCreep(
          [MOVE, MOVE, CARRY, WORK, WORK, WORK],
          "Worker" + i,
          {
            memory: { role: "Worker" },
          }
        );
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
    for (var i = 0; i <= 2; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Upgrader" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 300
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK], "Upgrader" + i, {
          memory: { role: "Upgrader" },
        });
        break;
      }
    }
    for (var i = 0; i <= 2; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Transporter" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 300
      ) {
        Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY], "Transporter" + i, {
          memory: { role: "Transporter" },
        });
        break;
      }
    }
    for (var i = 0; i <= 1; i++) {
      if (
        Game.spawns["Spawn1"].spawning == null &&
        Game.creeps["Archer" + i] == null &&
        Game.spawns["Spawn1"].store["energy"] >= 300
      ) {
        Game.spawns["Spawn1"].spawnCreep(
          [
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            TOUGH,
            MOVE,
            MOVE,
            MOVE,
            MOVE,
            MOVE,
            MOVE,
            MOVE,
            MOVE,
            RANGED_ATTACK,
          ],
          "Archer" + i,
          {
            memory: { role: "Archer" },
          }
        );
        break;
      }
    }
  }
  // FIM SPAWNS

  // INICIO CREEP ROLES
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.ticksToLive < 500) {
      creep.memory.needsRespawn = true;
    } else if (creep.ticksToLive > 1400) {
      creep.memory.needsRespawn = false;
    }

    if (creep.memory.needsRespawn === true) {
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
    } else if (creep.memory.role == "Transporter") {
      roleTransporter.trabalhar(creep);
    } else if (creep.memory.role == "Archer") {
      roleArcher.trabalhar(creep);
    } else if (creep.memory.role == "Builder") {
      roleBuilder.trabalhar(creep, emerg);
    } else if (creep.memory.role == "Healer") {
      roleHealer.trabalhar(creep);
    } else if (creep.memory.role == "Claimer") {
      roleClaimer.trabalhar(creep);
    } else if (creep.memory.role == "Upgrader") {
      roleUpgrader.trabalhar(creep, emerg);
    } else {
      roleRepair.trabalhar(creep, emerg);
    }
  }
  // FIM CREEP ROLES

  // INICIO TOWER ROLES
  var estruturas = creep.room.find(FIND_MY_STRUCTURES, {
    filter: (object) => object.structureType == "tower",
  });

  var hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: (hostil) => hostil.body.some((part) => part.type === HEAL),
  });

  if (hostiles.length === 0) {
    hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
  }

  for (var torre in estruturas) {
    if (hostiles.length === 0) {
      acfFunctions.torreRepair(estruturas[torre]);
    } else {
      acfFunctions.torreAttack(estruturas[torre], hostiles[0]);
    }
  }
  // FIM TOWER ROLES
};
