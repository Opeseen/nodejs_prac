const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const paymentSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      uppercase: true,
      required: [true, 'A payent must have a tag attached']
    },
    details: {
      type: String,
      uppercase: true,
      required: [true, 'A payent must have a description attached']
    },
    amount: {
      type: Number,
      required: [true, 'Amount payable is required']
    },
    date: {
      type: Date,
      required: [true, 'A payment date is required']
    },
    paymentRefId: String
  }
);

paymentSchema.plugin(toJson);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;