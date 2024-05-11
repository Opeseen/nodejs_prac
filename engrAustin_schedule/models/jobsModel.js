const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const jobSchema = new mongoose.Schema(
  {
    jobID:{
      type: String,
      required: [true, 'A Job must must contain an ID'],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [15, 'The Id of the Job must not be more that 15 character'],
      minlength: [6, 'The Id of the Job must not be less than 6 character']
    },
    jobType:{
      type: String,
      required: [true, 'Job type cannot be blank'],
      enum: {
        values: ['Product', 'Service'],
        message: 'Job type must be either "Product" or "Services"'
      }
    },
    jobDescription: {
      type: String,
      uppercase: true,
      maxlength: [60, 'The details of a job must not be more that 60 character']
    },
    jobPO:{
      type: String,
    }
  }
);

jobSchema.plugin(toJson);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;