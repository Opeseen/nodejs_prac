const {Payment} = require('../models');

const crearePayment = async(paymentDetails) =>{
  const newPayment = await Payment.create(paymentDetails);
  return newPayment;
};


module.exports = {
  crearePayment,
};
