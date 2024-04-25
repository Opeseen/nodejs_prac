const httpStatus = require('http-status');
const {jobService} = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');

const createJob = catchAsyncError(async(req, res) => {
  const jobDetails = req.body;

  const newJob = await jobService.createJob(jobDetails);
  res.status(httpStatus.OK).json({
    status: 'Success',
    data: newJob
  });
});

const getJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const job = await jobService.getJob(id);
  if(!job) { return next(new ApiError("No Job Found", httpStatus.NOT_FOUND)) }

  res.status(httpStatus.OK).json({
    status: 'Success',
    data: job
  })
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs()
  res.status(httpStatus.OK).json({
    status: 'Success',
    results: jobs.length,
    data: jobs
  })
});

const updateJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const updatedJob = await jobService.updateJob(id, req.body)

  if(!updatedJob){
    return next(new ApiError("No Job found to update", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.OK).json({
    status: 'Success',
    updatedJob
  })
});

const deleteJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const deletedJob = await jobService.deleteJob(id)

  if(!deletedJob){
    return next(new ApiError("No Job found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    status: 'Success'
  })
});



module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob
};