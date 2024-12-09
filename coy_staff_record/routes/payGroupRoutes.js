const express = require('express');
const {payGroupController} = require('../controllers');

const router = express.Router();

router.get('/view/all', payGroupController.getAllPayGroup);

module.exports = router;