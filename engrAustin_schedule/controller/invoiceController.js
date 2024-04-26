const httpStatus = require('http-status');
const {invoiceService} = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');

const createInvoice = catchAsyncError(async(req, res) => {
  const invoiceDetails = req.body;

  const newInvoice = await invoiceService.createInvoice(invoiceDetails);
  res.status(httpStatus.OK).json({
    status: 'Success',
    data: newInvoice
  });
});

const getInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const invoice = await invoiceService.getInvoice(id);
  if(!invoice) { return next(new ApiError("No Job Found", httpStatus.NOT_FOUND)) }

  res.status(httpStatus.OK).json({
    status: 'Success',
    data: invoice
  })
});

const getAllInvoices = catchAsyncError(async(req, res) => {
  const invoices = await invoiceService.getAllInvoices()
  res.status(httpStatus.OK).json({
    status: 'Success',
    results: invoices.length,
    data: invoices
  })
});

const updateInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const updatedInvoice = await invoiceService.updateInvoice(id, req.body)

  if(!updatedInvoice){
    return next(new ApiError("No Job found to update", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.OK).json({
    status: 'Success',
    updatedInvoice
  })
});

const deleteInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const deletedInvoice = await invoiceService.deleteInvoice(id)

  if(!deletedInvoice){
    return next(new ApiError("No Job found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    status: 'Success'
  })
});


module.exports = {
  createInvoice,
  getInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
};