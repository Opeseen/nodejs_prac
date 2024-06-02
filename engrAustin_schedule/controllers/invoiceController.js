const httpStatus = require('http-status');
const {invoiceService} = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');


const createInvoice = catchAsyncError(async(req, res) => {
  const invoiceDetails = req.body;

  const newInvoice = await invoiceService.createInvoice(invoiceDetails);
  res.status(httpStatus.OK).json({
    status: 'Success',
    newInvoice
  });
});

const getInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const invoice = await invoiceService.getInvoice(id);
  if(!invoice) { return next(new ApiError("No Invoice Found", httpStatus.NOT_FOUND)) }
  res.status(httpStatus.OK).json({
    status: 'Success',
    invoice
  })
});

const getAllInvoices = catchAsyncError(async(req, res) => {
  const invoices = await invoiceService.getAllInvoices();
  res.status(httpStatus.OK).json({
    status: 'Success',
    results: invoices.length,
    invoices
  })
});

const updateInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const invoice = await invoiceService.getInvoice(id);
  if(!invoice){
    return next(new ApiError("No Invoice found to update", httpStatus.NOT_FOUND));
  };
  
  invoice.invoiceNumber = req.body.invoiceNumber;
  invoice.jobID = req.body.jobID;
  invoice.invoiceDescription = req.body.invoiceDescription;
  invoice.invoiceClass = req.body.invoiceClass
  invoice.spentOnProject = req.body.spentOnProject || 0;
  invoice.witholdingTaxPercent = req.body.witholdingTaxPercent
  invoice.invoiceAppliedToSalesValue = req.body.invoiceAppliedToSalesValue;
  await invoice.save();

  res.status(httpStatus.OK).json({
    status: 'Success',
    invoice
  });
});

const deleteInvoice = catchAsyncError(async(req, res, next) => {
  const id = req.params.id;
  const deletedInvoice = await invoiceService.deleteInvoice(id)
  if(!deletedInvoice){
    return next(new ApiError("No Invoice found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    status: 'Success'
  });
});

const removePaymentFromInvoice = catchAsyncError(async(req, res) => {
  const id = req.params.id;
  const payid = req.params.payid;
  await invoiceService.removePaymentFromInvoice(id, payid);

  res.status(httpStatus.OK).json({
    status: 'Success',
    message: "Payment has been removed"
  });
});


module.exports = {
  createInvoice,
  getInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  removePaymentFromInvoice
};