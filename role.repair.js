var acfFunctions = require("acfFunctions");

var roleRepair = {
  trabalhar(creep, emerg) {
    if (emerg) {
      creep.moveTo(18, 31);
      return;
    }

    acfFunctions.repararClosest(creep);
  },
};

module.exports = roleRepair;
