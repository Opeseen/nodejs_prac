const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');

const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('base',{
    title: 'Home Page'
  });
});


module.exports = {
  displayHomePage
};