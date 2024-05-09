const express = require('express');
const {invoiceController} = require('../controller');

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
  .route('/:id/testing')
  .get(invoiceController.testing);

module.exports = router;