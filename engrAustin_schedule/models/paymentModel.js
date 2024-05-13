const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

const paymentSchema = new mongoose.Schema(
  {
    paymentTag: {
      type: String,
      uppercase: true,
      required: [true, 'A payent must have a tag attached']
    },
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
    paymentRefId: String
  }
);

paymentSchema.plugin(toJson);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;