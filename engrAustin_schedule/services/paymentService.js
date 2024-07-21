const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {Invoice} = require('../models');
const {Payment} = require('../models');

const createPayment = async(paymentDetails) =>{
  const newPayment = await Payment.create(paymentDetails);
  return newPayment;
};

const getPayment = async(id) => {
  const payment = await Payment.findById(id);
  return payment;
};

const findOnePayment = async(paymentRefId) =>{
  const payment = await Payment.findOne({paymentRefId})
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

const deletePayment = async(id) => {
  const payment = await Payment.findByIdAndDelete(id);
  return payment;
};

const getPaymentLedger = async(id) => {
  const paymentStatics = await Invoice.aggregate([
    {
      $match: {
        payment: {
          $elemMatch: {$in: [ObjectId(id)]}
        }
      }    
    },
    {
      $project: {
        invoiceNumber: 1,
        description: 1,
        invoicePaymentStatus: 1,
        invoiceClass: 1,
        partnerPayment: 1,
        _id: 1
      }
    }
  ]);
  return paymentStatics;
};

module.exports = {
  createPayment,
  getPayment,
  findOnePayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentLedger
};
