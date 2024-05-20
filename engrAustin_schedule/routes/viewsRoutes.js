const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/',viewsController.displayHomePage);
router.get('/jobs',viewsController.getAllJobs);


module.exports = router;