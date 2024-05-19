const httpStatus = require('http-status');
const {randomUUID} = require('crypto');
const {paymentService} = require('../services');
const {invoiceService} = require('../services');
const {Invoice} = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');


const createPayment = catchAsyncError(async(req, res) => {
  req.body.paymentRefId = randomUUID();
  const paymentDetails = req.body;
  const payment = await paymentService.createPayment(paymentDetails);

  // THIS STAGE WILL ATTACH THE PAYMENT-ID TO THE INVOICE IF AN INVOICE WAS SELECTED
  if (req.body.invoices && req.body.invoices.length > 0 && payment.id){
    req.body.invoices.forEach(invoiceId => {
      invoiceService.addPaymentIdToInvoice(invoiceId, payment.id);
    });
  };
  res.status(httpStatus.OK).json({
    status: 'Success',
    payment
  });
});

const getPayment = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const payment = await paymentService.getPayment(id);
  if(!payment) { return next(new ApiError("No Payment Found", httpStatus.NOT_FOUND)) }

  res.status(httpStatus.OK).json({
    status: 'Success',
    payment
  })
});

const getAllPayment = catchAsyncError(async(req, res) => {
  const payment = await paymentService.getAllPayment()
  res.status(httpStatus.OK).json({
    status: 'Success',
    results: payment.length,
    payment
  })
});

const updatePayment = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const updatedPayment = await paymentService.updatePayment(id, req.body)

  if(!updatedPayment){
    return next(new ApiError("No Payment found to update", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.OK).json({
    status: 'Success',
    updatedPayment
  })
});

const deletePayment = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const payment = await Invoice.find({paymentId: id});
  if(payment.length > 0){ return next(new ApiError('This Payment cannot be deleted because it is used on an Invoice', httpStatus.BAD_REQUEST)) };

  const deletePayment = await paymentService.deletePayment(id);
  if(!deletePayment){
    return next(new ApiError("No Payment found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    status: 'Success'
  })
});

const getPaymentLedger = catchAsyncError(async(req, res) => {
  const PaymentId = req.params.id;
  const paymentStatics = await paymentService.getPaymentLedger(PaymentId);

  res.status(httpStatus.OK).json({
    status: 'Success',
    results: paymentStatics.length > 0 ? paymentStatics.length : 0,
    paymentStatics
  });
});



module.exports = {
  createPayment,
  getPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentLedger
};