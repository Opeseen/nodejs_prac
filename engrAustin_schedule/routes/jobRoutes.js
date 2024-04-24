const express = require('express');
const {jobController} = require('../controller');

const router = express.Router();

router
  .route('/')
  .post(jobController.createJob);


module.exports = router;