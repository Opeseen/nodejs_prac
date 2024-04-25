const {Job} = require('../models');

const createJob = async(jobDetails) =>{
  const newJob = await Job.create(jobDetails);
  return newJob;
};

const getJob = async(jobId) => {
  const job = await Job.findById(jobId);
  return job;
};

const getAllJobs = async() => {
  const jobs = await Job.find();
  return jobs;
};

const updateJob = async(id, updatedDetails) => {
  const job = await Job.findByIdAndUpdate(id, updatedDetails, {new: true, runValidators: true});
  return job;
};

const deleteJob = async(jobId) => {
  const job = await Job.findByIdAndDelete(jobId);
  return job;
};



module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob
};