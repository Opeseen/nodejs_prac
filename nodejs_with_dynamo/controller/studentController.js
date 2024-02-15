const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {dynamoService} = require('../services');

const getStudentByEmail = catchAsyncError(async(req,res) => {
  const {email} = req.params; // get the email from the req.params
  // Check of the student email exists in the database
  const data = await dynamoService.getStudentByEmail(email);
  const result = Object.keys(data).length === 0 ? "No record found" : data;

  res.status(httpStatus.OK).json({status:'Success',result});
});


module.exports = {
  getStudentByEmail,
};