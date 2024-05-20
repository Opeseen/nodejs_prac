const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {jobService} = require('../services');

const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('base',{
    title: 'Home Page'
  });
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs();
  res.status(httpStatus.OK).render('job',{
    title: 'Jobs',
    jobs
  });
});



module.exports = {
  displayHomePage,
  getAllJobs
};