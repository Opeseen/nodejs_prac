const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {authController, studentController} = require('../controller');
const {requestBodySchema} = require('../validations/student.validate');


router
  .route('/')
  .get()
  .post(validate(requestBodySchema),authController.getStudentByEmail,authController.createStudentRecord);

router
  .route('/:email')
  .get(studentController.getStudentByEmail)

module.exports = router;
