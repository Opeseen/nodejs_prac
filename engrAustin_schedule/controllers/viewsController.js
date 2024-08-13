const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const {jobService, invoiceService, paymentService, userService} = require('../services');
const ApiError = require('../utils/ApiError');

// SECTION 1 - Jobs, Invoices & Payments
const displayHomePage = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('homepage',{
    title: 'Home Page'
  });
});

const getAllJobs = catchAsyncError(async(req, res) => {
  const jobs = await jobService.getAllJobs();
  res.status(httpStatus.OK).render('jobOutline',{
    title: 'Job',
    jobs
  });
});

const getJobDetails = catchAsyncError(async(req, res, next) => {
  const jobid = req.params.id;
  const job = await jobService.findOneJob(jobid);
  if(!job) { return next(new ApiError("No Job Found", httpStatus.NOT_FOUND)) }
  let jobStatics = await jobService.getJobLedger(job.id);

  // Strignify and parse job statistics to JSON before sending to the browser
  jobStatics = JSON.stringify(jobStatics);
  jobStatics = JSON.parse(jobStatics)

  res.status(httpStatus.OK).render('jobDetail',{
    title: 'Job Details',
    jobStaticsCount: jobStatics.length > 0 ? jobStatics.length : 0,
    jobStatics,
    job,
  });
});

const createJob = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('job',{
    title: 'Create Job',
  });
});

const createInvoice = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('invoice',{
    title: 'Create Invoice',
  });
});

const getAllInvoices = catchAsyncError(async(req, res) => {
  const invoices = await invoiceService.getAllInvoices();
  res.status(httpStatus.OK).render('invoiceOutline',{
    title: 'Invoice',
    invoices
  });
});

const getInvoiceDetails = catchAsyncError(async(req, res, next) => {
  const slug = req.params.id;
  const invoice = await invoiceService.findOneInvoice(slug);
  if(!invoice) { return next(new ApiError("No Invoice Found", httpStatus.NOT_FOUND)) }
  res.status(httpStatus.OK).render('invoiceDetail',{
    title: 'Invoice Details',
    invoice,
  });
});

const createPayment = catchAsyncError(async(req, res) => {
  res.status(httpStatus.OK).render('payment',{
    title: 'Create Payment',
  });
});

const getAllPayment = catchAsyncError(async(req, res) => {
  const payments = await paymentService.getAllPayment();
  res.status(httpStatus.OK).render('paymentOutline',{
    title: 'Payment',
    payments
  });
});

const getPaymentDetails = catchAsyncError(async(req, res, next) => {
  const paymentRef = req.params.id;
  const payment = await paymentService.findOnePayment(paymentRef);
  if(!payment) { return next(new ApiError("No Payment Found", httpStatus.NOT_FOUND)) }

  let paymentStatics = await paymentService.getPaymentLedger(payment._id); // This will return the invoices attached to the payment.

  // Strignify and parse payment statistics to JSON before sending to the browser
  paymentStatics = JSON.stringify(paymentStatics);
  paymentStatics = JSON.parse(paymentStatics)

  res.status(httpStatus.OK).render('paymentDetail',{
    title: 'Payment Details',
    paymentStaticsCount: paymentStatics.length > 0 ? paymentStatics.length : 0,
    paymentStatics,
    payment,
  });
  
});


// SECTION 2 - User
const registerUser = (req, res) => {
  res.status(httpStatus.OK).render('signup', {
    title: 'Create your account'
  });
};



module.exports = {
  // Section 1
  displayHomePage,
  getAllJobs,
  getJobDetails,
  createJob,
  createInvoice,
  getAllInvoices,
  getInvoiceDetails,
  createPayment,
  getAllPayment,
  getPaymentDetails,
  // Section 2
  registerUser
};