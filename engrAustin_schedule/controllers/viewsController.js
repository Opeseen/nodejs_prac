const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {jobService, invoiceService, paymentService, userService} = require('../services');
const ApiError = require('../utils/ApiError');

const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('base',{
    title: 'Home Page'
  });
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs();
  res.status(httpStatus.OK).render('jobOverview',{
    title: 'Job',
    jobs
  });
});

const getAllInvoices = catchAsyncError(async(req, res) => {
  const invoices = await invoiceService.getAllInvoices();
  res.status(httpStatus.OK).render('invoiceOverview',{
    title: 'Invoice',
    invoices
  });
});

const getInvoiceDetails = catchAsyncError(async(req, res, next) => {
  const slug = req.params.id;
  const invoice = await invoiceService.findOneInvoice(slug);
  const jobs = await jobService.getAllJobs();
  if(!invoice) { return next(new ApiError("No Invoice Found", httpStatus.NOT_FOUND)) }
  res.status(httpStatus.OK).render('invoiceDetail',{
    title: 'Invoice Details',
    invoice,
    jobs
  });
});

const getAllPayment = catchAsyncError(async(req, res) => {
  const payments = await paymentService.getAllPayment();
  res.status(httpStatus.OK).render('paymentOverview',{
    title: 'Payment',
    payments
  });
});


module.exports = {
  displayHomePage,
  getAllJobs,
  getAllInvoices,
  getAllPayment,
  getInvoiceDetails
};