const acfFunctions = require("acfFunctions");

var roleHarvester = {
  trabalhar(creep) {
    acfFunctions.mineracao(creep);
  },
};

module.exports = roleHarvester;
