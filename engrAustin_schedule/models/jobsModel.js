const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    jobID:{
      type: String,
      required: [true, 'A Job must must contain a job id'],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [15, 'The Id of the Job must not be more that 15 character'],
      minlength: [6, 'The Id of the Job must not be less than 6 character']
    },
    type:{
      type: String,
      required: [true, 'Job type cannot be blank'],
      enum: {
        values: ['Product', 'Service'],
        message: 'Job type must be either "Product" or "Service"'
      }
    },
    description: {
      type: String,
      uppercase: true,
      maxlength: [45, 'The details of a job must not be more that 45 character'],
      trim: true
    },
    jobPO:{
      type: String,
      trim: true
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      private: true
    },
  }
);

jobSchema.plugin(toJson);

// MIDDLEWARES EXECUTION

jobSchema.pre('save', function(next) {
  this.slug = slugify(this.jobID, { lower: true });
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;