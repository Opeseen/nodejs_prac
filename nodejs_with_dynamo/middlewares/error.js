const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const errorConverter = (err, req, res, next) => {
  let error = err;
  // console.log(error)
  if(!(error instanceof ApiError)){
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    if(error.code === "ConditionalCheckFailedException"){ return next(new ApiError(statusCode,"Error updating the requested resources due to a failed conditional expression")) };

    error = new ApiError(statusCode,error.message );
    
  };
  next(error);
};

const pathNotFoundErrorHandler = (req, res, next) => {
  const statusCode = httpStatus.NOT_FOUND;
  next(new ApiError(httpStatus.NOT_FOUND, `The requested url ${req.originalUrl} is ${httpStatus[statusCode]}`));
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const response = {
    error: true,
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };
  res.locals.errorMessage = message;
  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
  pathNotFoundErrorHandler,
  errorConverter
};
