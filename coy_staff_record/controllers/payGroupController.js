const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const ApiError = require('../utils/ApiError');
const { default: axios } = require('axios');

const getAllPayGroup = catchAsyncError(async(req, res) => {
  const requestType = req.query.reqType;
  const URL = 'http://localhost:8080/api/mun/v1/paygroup/all'
  if(requestType === 'clientRequest'){
    // Logic to process request from client "JavaScript"
    try {
      const response = await axios({
        method:	'GET',
        url:	URL
      });
      return res.status(httpStatus.OK).json({
        details: response.data.details,
        count: response.data.details.length
      });

    } catch (error) {
      console.log(error)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error Fetching PayGroup Data"
      });
    }
  }
  return res.status(httpStatus.OK).send("serverRequest")
});


module.exports = {
  getAllPayGroup
}