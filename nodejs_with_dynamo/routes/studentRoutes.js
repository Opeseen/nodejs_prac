const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {postStudentRecord} = require('../controller/studentController');
const {createStudentSchema} = require('../validations/student.validate');


router
  .route('/')
  .get()
  .post(validate(createStudentSchema),postStudentRecord);

router
  .route('/:price')
  .post(postStudentRecord);


module.exports = router;
