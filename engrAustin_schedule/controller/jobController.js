const httpStatus = require('http-status');
const {jobService} = require('../services');
const catchAsyncError = require('../utils/catchAsyncError');

const createJob = catchAsyncError(async(req, res) => {
  const jobDetails = req.body;

  const newJob = await jobService.createJob(jobDetails);
  res.status(httpStatus.OK).json({
    status: 'Success',
    data: newJob
  });
});


module.exports = {
  createJob,
};