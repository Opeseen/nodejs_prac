const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {dynamoService} = require('../services');
const ApiError = require('../utils/ApiError');

const getStudentByEmail = catchAsyncError(async(req,res) => {
  const {email} = req.params; // get the email from the req.params
  // Check if the student email exists in the database
  const data = await dynamoService.getStudentByEmail(email.toLowerCase());
  const result = Object.keys(data).length === 0 ? "No record found" : data;

  res.status(httpStatus.OK).json({status:'Success',result});
});

const getAllStudentInfo = catchAsyncError(async(req,res) => {
  // Get all the students data
  const data = await dynamoService.getAllStudentInfo();

  delete data.Count && delete data.ScannedCount; // Delete the "Count" and "ScannedCount infpo before sending the response."

  res.status(httpStatus.OK).json({status:'Success',data});
});

const updateStudentRecord = catchAsyncError(async(req, res) => {
  let data = req.body;
  const {email} = req.params; //Get the employee email
  const updatedData = await dynamoService.updateStudentRecord(data,email);

  res.status(httpStatus.OK).send(updatedData);
});

const deleteStudentRecord = catchAsyncError(async(req, res, next) => {
  const {email} = req.params; // get the email from the req.params
  // Check if the student email exists in the database
  const data = await dynamoService.getStudentByEmail(email.toLowerCase());

  if(!(Object.keys(data).includes('Item'))) { return next(new ApiError(httpStatus.NOT_FOUND,"No record found to delete")) };

  await dynamoService.deleteStudentRecord(email); // Delete the record if email exists in the database

  res.status(httpStatus.NO_CONTENT).send(null);
});

module.exports = {
  getStudentByEmail,
  getAllStudentInfo,
  updateStudentRecord,
  deleteStudentRecord
};