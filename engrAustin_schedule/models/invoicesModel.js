const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const slugify = require('slugify');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber:{
      type: String,
      required: [true, 'An Invoice number is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: 'Job',
    },
    description: {
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
    salesValue: {
      type: Number,
      required: [true, 'An invoice must have a value attached']
    },
    witholdingTaxPercent: {
      type: Number,
      required: [true, 'A witholding tax percentage is required'],
      default: 5,
    },
    spentValue: {
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
    partnerPayment:{
      type: Number,
      set: val => (Math.round(val * 100) / 100) // this will round up decimal points on the results
    },
    invoicePaymentStatus: {
      type: String,
      enum: {
        values: ['Paid', 'Unpaid', 'Partially Paid'],
        message: 'Payment status must be either "Paid" or "Unpaid or Partially Paid"'
      },
      default: "Unpaid"
    },
    payment: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Payment'
      }
    ],
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      private: true
    },
  }

);

invoiceSchema.plugin(toJson);

invoiceSchema.statics.calculatePaymentDetails = async function(invoice){
  // THIS WILL CALCULATE THE WHT, PROFITABILITY AND PARTNERS PAYMENT
  invoice.witholdingTaxAmount = ((invoice.witholdingTaxPercent / 100) * invoice.salesValue);
  invoice.profitOrLoss = (invoice.salesValue - (invoice.witholdingTaxAmount + invoice.spentValue));
  const percentage = invoice.invoiceClass ===  'Installation' ? 25 : 50;
  invoice.partnerPayment = ((percentage / 100) * invoice.profitOrLoss);
};

// MIDDLEWARES EXECUTION

invoiceSchema.pre('save', function(next) {
  this.slug = slugify(this.invoiceNumber, { lower: true });
  next();
});

invoiceSchema.pre('save', async function(next){
  this.constructor.calculatePaymentDetails(this);
  next();
});


const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;