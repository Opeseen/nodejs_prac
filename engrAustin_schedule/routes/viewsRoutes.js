const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/',viewsController.displayHomePage);
router.get('/jobs',viewsController.getAllJobs);
router.get('/invoice/create', viewsController.createInvoice);
router.get('/invoices/view', viewsController.getAllInvoices);
router.get('/invoice/:id', viewsController.getInvoiceDetails);
router.get('/payments', viewsController.getAllPayment);


module.exports = router;