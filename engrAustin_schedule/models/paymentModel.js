const mongoose = require('mongoose');
const {randomUUID} = require('crypto');
const toJson = require('@meanie/mongoose-to-json');

const paymentSchema = new mongoose.Schema(
  {
    paymentDetails: {
      type: String,
      uppercase: true,
      required: [true, 'A payent must have a description attached']
    },
    paymentAmount: {
      type: Number,
      required: [true, 'Amount payable is required']
    },
    paymentDate: {
      type: Date,
      required: [true, 'A payment date is required']
    },
    paymentId: String
  }
);

paymentSchema.plugin(toJson);

const Payment = mongoose.model('Payments', paymentSchema);

module.exports = Payment;