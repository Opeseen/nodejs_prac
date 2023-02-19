const express = require('express');
const {getALLPlanets} = require('./planets.controller');

const planetRouter = express.Router();

planetRouter.get('/planets', getALLPlanets);



module.exports = planetRouter