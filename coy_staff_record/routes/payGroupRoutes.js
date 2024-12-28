const express = require('express');
const {payGroupController} = require('../controllers');

const router = express.Router();

router.get('/create',payGroupController.createPayGroupForm);
router.get('/view/all', payGroupController.getAllPayGroup);
router.get('/view', payGroupController.getPayGroup);
router.post('/create/new', payGroupController.createPayGroup);
router.post('/update', payGroupController.updatePayGroup);
router.post('/employee/add', payGroupController.addEmployeeToPayGroup);
router.post('/delete', payGroupController.deletePayGroup);

module.exports = router;