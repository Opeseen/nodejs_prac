const express = require('express');
const {jobController} = require('../controller');

const router = express.Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);


module.exports = router;