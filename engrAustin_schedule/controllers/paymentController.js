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

  // THIS STAGE WILL ATTACH THE PAYMENT-ID TO THE INVOICE IF AN INVOICE WAS INPUTED
  if (req.body.invoices && req.body.invoices.length > 0 && payment.id){
    req.body.invoices.forEach(invoice => {
      invoiceService.addPaymentToInvoice(invoice, payment.id);
    });
  };
  res.status(httpStatus.OK).json({
    success: true,
    payment
  });
});

const getPayment = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const payment = await paymentService.getPayment(id);
  if(!payment) { return next(new ApiError("No Payment Found", httpStatus.NOT_FOUND)) }

  res.status(httpStatus.OK).json({
    success: true,
    payment
  })
});

const getAllPayment = catchAsyncError(async(req, res) => {
  const payment = await paymentService.getAllPayment();
  res.status(httpStatus.OK).json({
    success: true,
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

  // THIS STAGE WILL ATTACH THE PAYMENT-ID TO THE INVOICE IF AN INVOICE WAS INPUTED
  if (req.body.invoices && req.body.invoices.length > 0 && updatedPayment.id){
    try {
      await Promise.all(req.body.invoices.map(async (invoice) => {
        await invoiceService.addPaymentToInvoice(invoice, updatedPayment.id, req.body.invStatus);
      }))
    } catch (error) {
      return next(error)
    }

  };

  res.status(httpStatus.OK).json({
    success: true,
    updatedPayment
  })
});

const deletePayment = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const payment = await Invoice.find({payment: id});
  if(payment.length > 0){ return next(new ApiError('This Payment cannot be deleted because it is used on an Invoice', httpStatus.BAD_REQUEST)) };

  const deletePayment = await paymentService.deletePayment(id);
  if(!deletePayment){
    return next(new ApiError("No Payment found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    success: true
  })
});

const getPaymentLedger = catchAsyncError(async(req, res) => {
  const id = req.params.id;
  const paymentStatics = await paymentService.getPaymentLedger(id);

  res.status(httpStatus.OK).json({
    success: true,
    result: paymentStatics.length > 0 ? paymentStatics.length : 0,
    paymentStatics,
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