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
      maxlength: [100, 'The details of an invoice must not be more that 100 character'],
      uppercase: true
    },
    invoiceClass:{
      type: String,
      required: [true, 'Invoice must belong to a class'],
      enum: {
        values: ['Installation', 'Maintenance'],
        message: 'Invoice class must be either "Installation" or "Maintenance"'
      }
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
    spentOnProject: {
      type: Number,
      default: 0
    },
    witholdingTaxAmount: {
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    },
    profitOrLoss:{
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    },
    invoicePartnerPayment:{
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    }
  }

);

invoiceSchema.plugin(toJson);

invoiceSchema.statics.calculatePaymentDetails = async function(invoice){
  // THIS WILL CALCULATE THE WHT, PROFITABILITY AND PARTNERS PAYMENT
  invoice.witholdingTaxAmount = ((invoice.witholdingTaxPercent / 100) * invoice.invoiceAppliedToSalesValue);
  invoice.profitOrLoss = (invoice.invoiceAppliedToSalesValue - (invoice.witholdingTaxAmount + invoice.spentOnProject));
  const percentage = invoice.invoiceClass ===  'Installation' ? 25 : 50;
  invoice.invoicePartnerPayment = ((percentage / 100) * invoice.profitOrLoss);
};

invoiceSchema.statics.addInvoiceToJob = async function(invoice, jobID){
  const job = await Job.findById(jobID);
  if(job){
    job.invoices.addToSet(invoice);
    await job.save();
  };
};

invoiceSchema.statics.deleteInvoiceFromJob = async function(invoice,jobID){
  const job = await Job.findById(jobID);
  if(job){
    job.invoices.pull(invoice);
    await job.save();
  };
};


// MIDDLEWARES EXECUTION

invoiceSchema.pre('save', async function(next){
  this.constructor.calculatePaymentDetails(this);
  next();
});

invoiceSchema.post('save', async function(){
  if(this.jobID !== false){
    this.constructor.addInvoiceToJob(this._id, this.jobID)
  };
});

invoiceSchema.pre('findOneAndDelete', async function(next) {
  this.invoiceDetails = await this.findOne();
  next()
});

invoiceSchema.post('findOneAndDelete', async function(){
  if(this.invoiceDetails !== null){ // this will not run if the specified invoice is not found on the database
    await this.invoiceDetails.constructor.deleteInvoiceFromJob(this.invoiceDetails._id,this.invoiceDetails.jobID);
  };
});


const Invoice = mongoose.model('Invoices', invoiceSchema);

module.exports = Invoice;