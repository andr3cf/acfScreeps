const acfFunctions = require("acfFunctions");

var roleUpgrader = {
  trabalhar(creep, emerg) {
    if (emerg) {
      creep.moveTo(21, 40);
      return;
    }
    acfFunctions.repararController(creep);
  },
};

module.exports = roleUpgrader;
