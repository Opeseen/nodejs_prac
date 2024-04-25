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
    jobClass:{
      type: String,
      required: [true, 'Job must belong to a class'],
      enum: {
        values: ['Installation', 'Maintenance'],
        message: 'Job class must be either "Installation" or "Maintenance"'
      }   
    },
    jobPO:{
      type: String,
    }
  }
);

jobSchema.plugin(toJson);

const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;