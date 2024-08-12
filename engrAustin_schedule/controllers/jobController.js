const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {jobService} = require('../services');
const {Invoice} = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');

const createJob = catchAsyncError(async(req, res) => {
  const jobDetails = req.body;

  const newJob = await jobService.createJob(jobDetails);
  res.status(httpStatus.OK).json({
    success: true,
    newJob
  });
});

const getJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const job = await jobService.getJob(id);
  if(!job) { return next(new ApiError("No Job Found", httpStatus.NOT_FOUND)) }

  res.status(httpStatus.OK).json({
    success: true,
    job
  })
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs();
  res.status(httpStatus.OK).json({
    success: true,
    results: jobs.length,
    jobs
  })
});

const updateJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  if(req.body.jobID){req.body.slug = req.body.jobID}
  
  const updatedJob = await jobService.updateJob(id, req.body)

  if(!updatedJob){
    return next(new ApiError("No Job found to update", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.OK).json({
    success: true,
    updatedJob
  })
});

const deleteJob = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const job = await Invoice.find({job: ObjectId(id)});
  if(job.length > 0){ return next(new ApiError('This Job cannot be deleted because it is used on an Invoice', httpStatus.BAD_REQUEST)) };

  const deletedJob = await jobService.deleteJob(id);
  if(!deletedJob){
    return next(new ApiError("No Job found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    success: true
  })
});

const getJobLedger = catchAsyncError(async(req, res) => {
  const id = req.params.id;
  const jobStatics = await jobService.getJobLedger(id);

  res.status(httpStatus.OK).json({
    success: true,
    results: jobStatics.length > 0 ? jobStatics[0].details.length : 0,
    jobStatics
  });

});

module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobLedger
};