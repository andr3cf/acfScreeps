const acfFunctions = require("acfFunctions");

var roleUpgrader = {
  trabalhar(creep, emerg) {
    if (emerg) {
      acfFunctions.mineracao(creep);
      return;
    }
    acfFunctions.repararController(creep);
  },
};

module.exports = roleUpgrader;
