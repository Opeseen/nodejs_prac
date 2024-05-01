const mongoose = require('mongoose');
const Job = require('./jobsModel')
const toJson = require('@meanie/mongoose-to-json');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber:{
      type: String,
      required: [true, 'An Invoice number is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    jobID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job',
    },
    invoiceDescription: {
      type: String,
      required: [true, 'An invoice must have a description'],
      trim: true,
      maxlength: [60, 'The details of an invoice must not be more that 60 character'],
      uppercase: true
    },
    invoiceAppliedToSalesValue: {
      type: Number,
      required: [true, 'An invoice must have a value attached']
    },
    witholdingTaxPercent: {
      type: Number,
      required: [true, 'A witholding tax percentage is required'],
      default: 5,
    },
    witholdingTaxAmount: {
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    },
    spentOnProject: {
      type: Number,
      default: 0
    }
  }

);

invoiceSchema.plugin(toJson);

invoiceSchema.statics.calculateWithiolding = async function(invoice){
  // THIS WILL CALCULATE THE WHT AMOUNT
  const witholdingTaxDeduction = ((invoice.witholdingTaxPercent / 100) * invoice.invoiceAppliedToSalesValue);
  invoice.witholdingTaxAmount = witholdingTaxDeduction;
};

invoiceSchema.statics.calcPartnersPayment = async function(invoiceID) {
    // THIS WILL CALCULATE THE PROFITABILITY AND PARTNERS PROFIT
  const stats = await Invoice.aggregate([
    {
      $match: {invoiceNumber : invoiceID}
    },
    {
      $project: {
        jobID: true,
        witholdingTaxAmount: true,
        spentOnProject: true,
        invoiceAppliedToSalesValue: true,
        _id: false
      }
    }
  ]);
  const jobID = stats[0].jobID;
  const profitability = (stats[0].invoiceAppliedToSalesValue - (stats[0].witholdingTaxAmount + stats[0].spentOnProject));
  if(jobID){
    const job = await Job.findById(jobID);
    if(job){
      const percentage = job.jobClass ===  'Installation' ? 25 : 50;
      const partnerPayment = ((percentage / 100) * profitability);
      await Job.findByIdAndUpdate(jobID, {profitability,partnerPayment})
    };
  };
};

// THIS WILL DELETE THE PARTNER PROFIT AND JOB PROFITABILITY ON THE JOB RECORD
invoiceSchema.statics.modifyJobDetails = async function(jobID){
  await Job.findByIdAndUpdate(jobID, {
    partnerPayment: null,
    profitability: null
  });
};


// MIDDLEWARES EXECUTION

invoiceSchema.pre('save', async function(next){
  this.constructor.calculateWithiolding(this);
  next();
});

invoiceSchema.post('save', async function(){
  this.constructor.calcPartnersPayment(this.invoiceNumber);
});

// SET MIDDLEWARE ON FIND AND DELETE
invoiceSchema.pre('findOneAndDelete', async function(next){
  this.invoiceFetched = await this.findOne(); // await will work here because the query has not yet run
  next();
});

invoiceSchema.post('findOneAndDelete', async function(){
  if(this.invoiceFetched !== null){ // this will not run if the specified invoice is not found on the database
    await this.invoiceFetched.constructor.modifyJobDetails(this.invoiceFetched.jobID);
  };
});

const Invoice = mongoose.model('Invoices', invoiceSchema);

module.exports = Invoice;