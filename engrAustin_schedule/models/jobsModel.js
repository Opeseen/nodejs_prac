const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    jobid:{
      type: String,
      required: [true, 'A Job must must contain an ID'],
      unique: true,
      trim: true,
      maxlength: [15, 'The Id of the Job must not be more that 15 character'],
      minlength: [6, 'The Id of the Job must not be less than 6 character']
    },
    jobtype:{
      type: String,
      required: [true, 'Job type cannot be blank'],
      enum: {
        values: ['Product', 'Service'],
        message: 'Job type must be either "Product" or "Services"'
      }
      
    }
  }
);

jobSchema.plugin(toJson);

const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;