const express = require('express');
const {employeeController} = require('../controllers');

const router = express.Router();

router.get('/view/all', employeeController.getAllEmployees);
router.get('/view', employeeController.getEmployee);
router.post('/update', employeeController.updateEmployee);

module.exports = router;