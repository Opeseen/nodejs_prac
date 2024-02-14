const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {dynamoService} = require('../services');


const postStudentRecord = catchAsyncError(async(req, res) => {
  const data = req.body;
  const result = dynamoService.testStudentRecord(data)
  res.status(httpStatus.OK).json({status: 'Success', result});
});

module.exports = {
  postStudentRecord
};