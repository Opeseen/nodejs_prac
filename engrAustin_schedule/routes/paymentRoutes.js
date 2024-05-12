const express = require('express');
const {paymentController} = require('../controller');

const router = express.Router();

router
  .route('/')
  .get(paymentController.getAllPayment)
  .post(paymentController.createPayment);


router
  .route('/:id')
  .get(paymentController.getPayment)
  .patch(paymentController.updatePayment);

router
  .route('/:id/ledger')
  .get(paymentController.getPaymentLedger);


module.exports = router;