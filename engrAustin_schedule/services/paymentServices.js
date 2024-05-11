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
  const payment = await Payment.findByIdAndDelete(jobId);
  return payment;
};


module.exports = {
  createPayment,
  getPayment,
  getAllPayment,
  updatePayment,
  deletePayment
};
