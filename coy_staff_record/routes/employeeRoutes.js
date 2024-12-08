const express = require('express');
const {employeeController} = require('../controllers');

const router = express.Router();

router.get('/view/all', employeeController.listAllEmployees);
router.get('/view', employeeController.getEmployee);

module.exports = router;