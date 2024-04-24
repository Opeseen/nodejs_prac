const {Job} = require('../models');

const createJob = async(jobDetails) =>{
  const job = await Job.create(jobDetails);
  return job;
};


module.exports = {
  createJob,
};