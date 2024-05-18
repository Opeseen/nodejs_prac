const express = require('express');
const {paymentController} = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(paymentController.getAllPayment)
  .post(paymentController.createPayment);


router
  .route('/:id')
  .get(paymentController.getPayment)
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

router
  .route('/:id/ledger')
  .get(paymentController.getPaymentLedger);


module.exports = router;