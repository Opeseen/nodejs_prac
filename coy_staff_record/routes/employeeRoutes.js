const express = require('express');
const {employeeController} = require('../controllers');

const router = express.Router();

router.get('/create',employeeController.createEmployeeForm);
router.get('/view/all', employeeController.getAllEmployees);
router.get('/view', employeeController.getEmployee);
router.post('/create/new', employeeController.createEmployee);
router.post('/update', employeeController.updateEmployee);
router.post('/paygroup/update', employeeController.updatedEmployeePayGroup);

module.exports = router;