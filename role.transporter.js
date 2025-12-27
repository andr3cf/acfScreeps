//const acfFunctions = require("acfFunctions");

const origemStructureID1 = "b63378a0b7f72df";
const origemStructureID2 = "beb490fb28bc803";

var roleTransporter = {
  trabalhar(creep) {
    var container = Game.getObjectById(origemStructureID1);
    if (creep.name == "Transporter3" || creep.name == "Transporter4") {
      container = Game.getObjectById(origemStructureID2);
    }
    if (container == null) {
      creep.moveTo(37, 25);
      return;
    }
    //console.log(creep.name + " - " + container.pos);
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (container.store["energy"] >= 50) {
        if (
          creep.withdraw(
            container,
            RESOURCE_ENERGY,
            creep.store.getFreeCapacity(RESOURCE_ENERGY)
          )
        ) {
          creep.moveTo(container);
        }
      } else {
        if (creep.name == "Transporter3" || creep.name == "Transporter4") {
          creep.moveTo(21, 40);
        } else {
          creep.moveTo(37, 25);
        }
      }
    } else {
      var closestExtension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (objeto) =>
          objeto.structureType == "extension" &&
          objeto.store[RESOURCE_ENERGY] < 50,
      });
      if (closestExtension == null || closestExtension == undefined) {
        if (creep.name == "Transporter3" || creep.name == "Transporter4") {
          creep.moveTo(21, 40);
        } else {
          creep.moveTo(37, 25);
        }
      } else {
        if (
          creep.transfer(closestExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(closestExtension);
        }
      }
    }
  },
};

module.exports = roleTransporter;
