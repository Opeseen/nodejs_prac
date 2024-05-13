const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Invoice} = require('../models');
const {Payment} = require('../models');

const createPayment = async(paymentDetails) =>{
  const newPayment = await Payment.create(paymentDetails);
  return newPayment;
};

const getPayment = async(paymentId) => {
  const payment = await Payment.findById(paymentId);
  return payment;
};

const getAllPayment = async() => {
  const payments = await Payment.find();
  return payments;
};

const updatePayment = async(id, updatedDetails) => {
  const payment = await Payment.findByIdAndUpdate(id, updatedDetails, {new: true, runValidators: true});
  return payment;
};

const deletePayment = async(paymentId) => {
  const payment = await Payment.findByIdAndDelete(paymentId);
  return payment;
};

const getPaymentLedger = async(PaymentId) => {
  const paymentStatics = await Invoice.aggregate([
    {
      $match: {
        paymentId: {
          $elemMatch: {$in: [ObjectId(PaymentId)]}
        }
      }    
    },
    {
      $project: {
        invoiceNumber: 1,
        invoiceDescription: 1,
        invoicePaymentStatus: 1,
        invoicePartnerPayment: 1,
        _id: 0
      }
    }
  ]);
  return paymentStatics;
};

module.exports = {
  createPayment,
  getPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentLedger
};
