const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.ObjectId,
      ref: 'Invoice',
      required: [true, 'A payment must be attached to an invoice']
    },
    jobPO: String,
    paymentDetails: {
      type: String,
      required: [true, 'A payent must have a description attached']
    },
    paymentDate: Date
  }
);

paymentSchema.plugin(toJson);

const Payment = mongoose.model('Payments', paymentSchema);

module.exports = Payment;