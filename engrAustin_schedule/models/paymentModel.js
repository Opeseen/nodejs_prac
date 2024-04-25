const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A payment must be attached to an invoice']
    },
    jobPO: String,
    paymentDetails: {
      type: String,
      required: [true, 'A payent must have a description attached']
    },
    witholdingTax: {
      type: Number,
      required: [true, 'A witholding tax percentage is required']
    },
    spentOnProject: Number,
    invoiceValue: {
      type: mongoose.Schema.ObjectId,
      ref: 'Invoice',
      required: [true, 'An invoice must be attached to a payment']
    },
    paymentDate: Date
  }
);

paymentSchema.plugin(toJson);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;