const mongoose = require('mongoose');
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
      required: [true, 'An invoice must be attached to a job']
    },
    invoiceDescription: {
      type: String,
      required: [true, 'An invoice must have a description'],
      trim: true,
      maxlength: [60, 'The details of an invoice must not be more that 60 character']
    },
    invoiceAppliedToSalesValue: {
      type: Number,
      required: [true, 'An invoice must have a value attached']
    },
    witholdingTax: {
      type: Number,
      required: [true, 'A witholding tax percentage is required']
    },
    spentOnProject: Number,
    profit:{
      type: Number,
      required: [true, 'Profit on invoice can not be blank']
    },
    austinPayment: {
      type: Number,
      required: [true, 'Share of payment is required']
    }
  }

);

invoiceSchema.plugin(toJson);

const Invoice = mongoose.model('Invoices', invoiceSchema);

module.exports = Invoice;