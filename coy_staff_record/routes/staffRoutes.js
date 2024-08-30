const express = require('express');
const { staffController } = require('../controllers');

const router = express.Router();

router.get('/download', staffController.generatePDF);

module.exports = router;