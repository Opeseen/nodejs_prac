const mongoose = require('mongoose');
const Job = require('./jobsModel')
const toJson = require('@meanie/mongoose-to-json');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNunber:{
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
    },
    profit:{
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    },
    partnerPayment: {
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    }
  }

);

invoiceSchema.plugin(toJson);

// Set middleware on all "findOneAnd"
invoiceSchema.pre(/^findOneAnd/, async function(next){
  this.invoiceFetched = await this.findOne();
  console.log(this.invoiceFetched);
  next();
});

// THIS MIDDLEWARE WILL CALCULATE THE WHT AMOUNT
invoiceSchema.pre('save', async function(next){
  const witholdingTaxDeduction = ((this.witholdingTaxPercent / 100) * this.invoiceAppliedToSalesValue);
  this.witholdingTaxAmount = witholdingTaxDeduction;
  return next();
});

// THIS MIDDLEWARE WILL CALCULATE THE JOB PROFIT
invoiceSchema.pre('save', function(next) {
  const caculatedProfit = (this.invoiceAppliedToSalesValue - (this.witholdingTaxAmount + this.spentOnProject));
  this.profit = caculatedProfit;
  next();
});

// THIS MIDDLEWARE WILL CALCULATE THE PARTNERS PAYMENT
invoiceSchema.pre('save', async function(next) {
  if(this.jobID){
    const job = await Job.findById(this.jobID);
    if(job){
      const percentage = job.jobClass === 'Installation' ? 25 : 50;
      this.partnerPayment = ((percentage / 100) * this.profit);
      return next();
    };
  }

});


const Invoice = mongoose.model('Invoices', invoiceSchema);

module.exports = Invoice;