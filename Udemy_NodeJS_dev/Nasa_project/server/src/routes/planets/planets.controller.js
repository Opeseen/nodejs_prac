const {planets} = require('../../models/planet.model');

function getALLPlanets(req,res){
  return res.status(200).json(planets);
  console.log(planets)
};


module.exports = {
  getALLPlanets
};