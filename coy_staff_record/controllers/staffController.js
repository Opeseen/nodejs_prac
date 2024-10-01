const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsyncError = require('../utils/catchAsyncError');
const axios = require('axios');

const puppeteer = require('puppeteer');
const path = require("path");
const absolutePath = path.resolve("test.html");



const generatePDF = catchAsyncError(async(req, res, next) => {
  (async () => {
    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    await page.goto(`file://${absolutePath}`);
    await page.pdf({ path: 'output.pdf', format: 'A4'});
  
    await browser.close();
    console.log('PDF generated successfully!');
    res.status(httpStatus.OK).json({
      success: true,
    })
  })();
});

const getEmployee = catchAsyncError(async(req, res, next) => {
  const id = req.query.id;
  axios.get(`http://localhost:8080/mundial/employee/${id}`)
  .then(response => {
    res.status(httpStatus.OK).json({
      data: response.data
    })
  })
  .catch(error => {
    res.status(error.response.status).json({
      data: error.response.data
    })
  });

});


module.exports = {
generatePDF,
getEmployee
};