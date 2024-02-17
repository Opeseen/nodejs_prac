const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {authController, studentController} = require('../controller');
const {createRecordSchema,updateRecordSchema,deleteRecordSchema} = require('../validations/student.validate');


router
  .route('/')
  .get(studentController.getAllStudentInfo)
  .post(validate(createRecordSchema),authController.getStudentByEmail,authController.createStudentRecord);

router
  .route('/:email')
  .get(studentController.getStudentByEmail)
  .put(validate(updateRecordSchema),studentController.updateStudentRecord)
  .delete(validate(deleteRecordSchema),studentController.deleteStudentRecord);


module.exports = router;
