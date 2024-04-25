const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNunber:{
      type: String,
      required: [true, 'An Invoice number is required'],
      unique: true,
      trim: true,
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
    },
    invoiceAppliedToSalesValue: {
      type: Number,
      required: [true, 'An invoice must have a value attached']
    }
  }

);

invoiceSchema.plugin(toJson);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;