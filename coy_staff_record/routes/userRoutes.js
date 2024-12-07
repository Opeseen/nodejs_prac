const express = require('express');
const { staffController } = require('../controllers');

const router = express.Router();

router.get('/download', staffController.generatePDF);
router.get('/employee', staffController.getEmployee);

// module.exports = router;