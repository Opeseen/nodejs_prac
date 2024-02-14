const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const postStudentRecord = (req, res, next) => {
  console.log(req)
  try {
    res.status(httpStatus.OK).json({status: 'Success'});
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST,error));
  }
};

module.exports = {
  postStudentRecord
};