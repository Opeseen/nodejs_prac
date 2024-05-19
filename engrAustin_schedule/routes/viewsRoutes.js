const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/',viewsController.displayHomePage);


module.exports = router;