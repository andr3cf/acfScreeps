const acfFunctions = require("acfFunctions");

var prioridade = false;

var roleBuilder = {
  trabalhar(creep, emerg) {
    if (emerg) {
      creep.moveTo(21, 37);
      return;
    }

    if (creep.room.controller.ticksToDowngrade <= 5100) {
      prioridade = true;
    } else if (creep.room.controller.ticksToDowngrade >= 10000) {
      prioridade = false;
    }

    if (prioridade) {
      acfFunctions.repararController(creep);
    } else {
      acfFunctions.construirMaisProximo(creep);
    }
  },
};

module.exports = roleBuilder;
