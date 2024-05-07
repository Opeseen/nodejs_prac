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
  const statics = await Invoice.aggregate([
    {
      $match: {jobID: ObjectId(Id) }
    },
    {
      $group: {
        _id: '$jobID',
        details:{
          $push: {
            invoiceNumber: "$invoiceNumber",
            invoiceDescription: "$invoiceDescription",
            invoiceAppliedToSalesValue: "$invoiceAppliedToSalesValue",
            spentOnProject: "$spentOnProject"
          }
        }
      }
    },
    {
      $addFields: {
        totalExpenses: {$sum: "$details.spentOnProject"},
        totalRevenue: {$sum: "$details.invoiceAppliedToSalesValue"}
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
  
  return statics;

};

module.exports = {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobLedger
};