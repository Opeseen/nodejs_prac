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
    jobPO:{
      type: String,
    },
    invoices: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Invoices',
      }
    ]
  }
);

jobSchema.plugin(toJson);

// QUERY MIDDLEWARE TO POPULATE INVOICE DATA
jobSchema.pre(/^find/, function(next) {
  this.populate({path: 'invoices'});
  next();
});


const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;