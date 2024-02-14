const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {postStudentRecord} = require('../controller/studentController');
const {requestBodySchema} = require('../validations/student.validate');


router
  .route('/')
  .get()
  .post(validate(requestBodySchema),postStudentRecord);

module.exports = router;
