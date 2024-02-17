const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {dynamoService} = require('../services');
const ApiError = require('../utils/ApiError');


const createStudentRecord = catchAsyncError(async(req, res) => {
  const data = req.body;
  const result = await dynamoService.createStudentRecord(data)
  res.status(httpStatus.OK).json({status: 'Success', result});
});

const getStudentByEmail = catchAsyncError(async(req,res,next) => {
  const {email} = req.body; // get the email from the req.body
  // Check of the student email exists in the database
  const result = await dynamoService.getStudentByEmail(email.toLowerCase());
  // Throw an Error if the email address already exists
  if(Object.keys(result).includes('Item')) { return next(new ApiError(httpStatus.BAD_REQUEST, "Email address is already taken")) };

  next();
});

module.exports = {
  createStudentRecord,
  getStudentByEmail,
};