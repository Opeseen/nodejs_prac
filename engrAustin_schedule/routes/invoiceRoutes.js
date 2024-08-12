const express = require('express');
const {invoiceController} = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(invoiceController.getAllInvoices)
  .post(invoiceController.createInvoice);

router
  .route('/:id')
  .get(invoiceController.getInvoice)
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

router
  .route('/:id/payment/:payid/unlink')
  .patch(invoiceController.removePaymentFromInvoice);

// router
//   .route('/testing')
//   .post(invoiceController.testError);

module.exports = router;