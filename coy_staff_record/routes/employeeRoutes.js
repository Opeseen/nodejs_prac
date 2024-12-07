const express = require('express');
const {employeeController} = require('../controllers');

const router = express.Router();

router.get('/view/list', employeeController.listAllEmployees);

module.exports = router;