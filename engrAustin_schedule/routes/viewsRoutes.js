const express = require('express');
const {viewsController} = require('../controllers');

const router = express.Router();

router.get('/',viewsController.displayHomePage);
router.get('/jobs',viewsController.getAllJobs);
router.get('/invoices', viewsController.getAllInvoices);
router.get('/payments', viewsController.getAllPayment);
router.get('/invoice/:id', viewsController.getInvoiceDetails);

module.exports = router;