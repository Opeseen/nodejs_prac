const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {jobService, invoiceService, paymentService, userService} = require('../services');

const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('base',{
    title: 'Home Page'
  });
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs();
  res.status(httpStatus.OK).render('job',{
    title: 'Jobs',
    jobs
  });
});

const getAllInvoices = catchAsyncError(async(req, res) => {
  const invoices = await invoiceService.getAllInvoices();
  res.status(httpStatus.OK).render('invoice',{
    title: 'Invoice',
    invoices
  });
});

const getAllPayment = catchAsyncError(async(req, res) => {
  const payments = await paymentService.getAllPayment();
  res.status(httpStatus.OK).render('payment',{
    title: 'Payment',
    payments
  });
});


module.exports = {
  displayHomePage,
  getAllJobs,
  getAllInvoices,
  getAllPayment
};