const express = require('express');
const {paymentController} = require('../controller');

const router = express.Router();

router
  .route('/')
  .post(paymentController.createPayment);


module.exports = router;