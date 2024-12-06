const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/', viewsController.displayHomePage);

router.get('/employees/view', viewsController.listEmployees);

module.exports = router;