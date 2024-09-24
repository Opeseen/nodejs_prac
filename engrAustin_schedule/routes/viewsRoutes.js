const express = require('express');
const {viewsController} = require('../controllers');
const {isLoginAuth, homepageAuth, redirectIfLogin} = require('../middlewares/authentication');

const router = express.Router();

// Homepage Route
router.get('/',homepageAuth, viewsController.displayHomePage);

// User Route
router.get('/user/register',redirectIfLogin, viewsController.registerUser);
router.get('/user/login',redirectIfLogin, viewsController.loginUser);
router.get('/user/logout',redirectIfLogin, viewsController.loggedOutUserPage);

// Job Route
router.get('/job/create',isLoginAuth, viewsController.createJob);
router.get('/jobs/view',isLoginAuth, viewsController.getAllJobs);
router.get('/job/:id',isLoginAuth, viewsController.getJobDetails)

// Invoice Route
router.get('/invoice/create',isLoginAuth, viewsController.createInvoice);
router.get('/invoices/view',isLoginAuth, viewsController.getAllInvoices);
router.get('/invoice/:id',isLoginAuth, viewsController.getInvoiceDetails);

// Payment Route
router.get('/payment/create',isLoginAuth, viewsController.createPayment);
router.get('/payments/view',isLoginAuth, viewsController.getAllPayment);
router.get('/payment/:id',isLoginAuth, viewsController.getPaymentDetails);

module.exports = router;