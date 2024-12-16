const express = require('express');
const {payGroupController} = require('../controllers');

const router = express.Router();

router.get('/create',payGroupController.createPayGroupForm);
router.get('/view/all', payGroupController.getAllPayGroup);
router.post('/create/new', payGroupController.createPayGroup);
router.post('/employee/add', payGroupController.addEmployeeToPayGroup);

module.exports = router;