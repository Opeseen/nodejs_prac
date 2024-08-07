const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/',viewsController.displayHomePage);

// Job Route
router.get('/job/create', viewsController.createJob);
router.get('/jobs/view',viewsController.getAllJobs);
router.get('/job/:id',viewsController.getJobDetails)

// Invoice Route
router.get('/invoice/create', viewsController.createInvoice);
router.get('/invoices/view', viewsController.getAllInvoices);
router.get('/invoice/:id', viewsController.getInvoiceDetails);

// Payment Route
router.get('/payment/create', viewsController.createPayment);
router.get('/payments/view', viewsController.getAllPayment);
router.get('/payment/:id', viewsController.getPaymentDetails);

module.exports = router;