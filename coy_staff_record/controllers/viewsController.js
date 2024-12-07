const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const ApiError = require('../utils/ApiError');

const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('homepage',{
    title: 'Home Page'
  });
});


module.exports = {
  displayHomePage,
};