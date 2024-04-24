const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const errorConverter = (err, req, res, next) => {
  let error = err;
  // console.error(error.name)
  // console.log(error)
  if(!(error instanceof ApiError)){
    const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(message, statusCode);

  };
  next(error);
};

const pathNotFoundErrorHandler = (req, res, next) => {
  const statusCode = httpStatus.NOT_FOUND;
  next(new ApiError(`The requested url ${req.originalUrl} is ${httpStatus[statusCode]}`, httpStatus.NOT_FOUND));
};

const errorHandler = (err, req, res, next) => {
  let {message, statusCode} = err;
  const response = {
    error: true,
    status: `${statusCode}`.startsWith('4') ? 'FAILED' : 'ERROR',
    code: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message,
    ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
  };
  
  res.locals.errorMessage = message;
  res.status(statusCode).send(response);
};


module.exports = {
  errorHandler,
  pathNotFoundErrorHandler,
  errorConverter,
};