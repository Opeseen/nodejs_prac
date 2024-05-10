const httpStatus = require('http-status');
const {paymentService} = require('../services');
const {randomUUID} = require('crypto');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');


const createPayment = catchAsyncError(async(req, res) => {
  req.body.paymentId = randomUUID();
  const paymentDetails = req.body;

  const newPayment = await paymentService.crearePayment(paymentDetails);
  if (req.body.invoices){
    console.log(req.body)
  }
  res.status(httpStatus.OK).json({
    status: 'Success',
    data: newPayment
  });
});

module.exports = {
  createPayment
};