const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Job} = require('../models');
const {Invoice} = require('../models');


const createJob = async(jobDetails) =>{
  const newJob = await Job.create(jobDetails);
  return newJob;
};

const getJob = async(jobId) => {
  const job = await Job.findById(jobId);
  return job;
};

const findOneJob = async(jobID) =>{
  const job = await Job.findOne({jobID})
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


const getJobLedger = async(Id) => {
  const jobStatics = await Invoice.aggregate([
    {
      $match: {job: ObjectId(Id) }
    },
    {
      $group: {
        _id: '$job',
        details:{
          $push: {
            invoiceNumber: "$invoiceNumber",
            description: "$description",
            salesValue: "$salesValue",
            spentValue: "$spentValue"
          }
        }
      }
    },
    {
      $addFields: {
        totalExpenses: {$sum: "$details.spentValue"},
        totalRevenue: {$sum: "$details.salesValue"}
      }
    },
    {
      $addFields: {
        NetProfitOrLoss: {$subtract: ["$totalRevenue", "$totalExpenses"]}
      }
    },
    {
      $project: {"_id": 0 }
    }
  ]);
  
  return jobStatics;
};

module.exports = {
  createJob,
  getJob,
  findOneJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobLedger
};