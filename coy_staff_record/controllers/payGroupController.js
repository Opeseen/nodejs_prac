const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const ApiError = require('../utils/ApiError');
const { default: axios } = require('axios');

const createPayGroupForm = catchAsyncError(async(req, res) => {
	res.status(httpStatus.OK).render('createPayGroup', {
    title: 'Create PayGroup',
  });
});

const createPayGroup = catchAsyncError(async(req, res, next) => {
	const category = req.body.category;
	const basic = Number(req.body.basic);
	const housing = Number(req.body.housing);
	const transport = Number(req.body.transport);
	const utility = Number(req.body.utility);
	const tax = Number(req.body.tax);
	// Check if PayLoad Data Exists
	if(!(category && basic && housing && transport && utility && 
    tax)) return next(new ApiError("Incomplete Payload Data in request", httpStatus.BAD_REQUEST));
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:8080/api/mun/v1/paygroup`,
      data: {
        category,
        basic,
        housing,
        transport,
        utility,
        tax
      }
    });
    if(response.data.success){
      res.status(httpStatus.OK).json({
        success: true
      });
    }
  } catch (error) {
    console.log(error.response.data)
    if(error.code === 'ECONNREFUSED') return next(new ApiError(`CONNECTION ERROR AT ${URL}`, httpStatus.BAD_REQUEST));
    if(error.response.data.message) return next(new ApiError(error.response.data.message,error.response.status));
    return next(new ApiError("Error Occurred While Creating PayGroup Data", httpStatus.INTERNAL_SERVER_ERROR));
  }
});

const getAllPayGroup = catchAsyncError(async(req, res) => {
  let allPayGroup = false;
  const requestType = req.query.reqType;
  const URL = 'http://localhost:8080/api/mun/v1/paygroup/all'
  try {
    const response = await axios({
      method:	'GET',
      url:	URL
    });
    // Logic to process request from client "JavaScript"
    if(requestType === 'clientRequest'){
      return res.status(httpStatus.OK).json({
        success: true,
        details: response.data.details,
        count: response.data.details.length
      });
    }
    // Logic to process request from "Server Side"
    return res.status(httpStatus.OK).render('payGroup', {
      title: 'PayGroup',
      allPayGroup : response.data.details?.length ? response.data.details : false
    });
    // return res.status(httpStatus.OK).send("serverRequest")
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error Fetching PayGroup Data"
    });
  }
});

const getPayGroup = catchAsyncError(async(req, res, next) => {
  let payGroupDetails = false;
  const payGroupId = req.query.eid;
  const URL = `http://localhost:8080/api/mun/v1/paygroup/${payGroupId}`;

  try {
    const response = await axios({
      method: 'GET',
      url: URL
    });
    if(response.data.success){
      payGroupDetails = response.data.details;
      return res.status(httpStatus.OK).render('payGroupDetails',{
        title: 'PayGroup Information',
        payGroupDetails
      });
    }
  } catch (error) {
    console.log(error.response.data);
		if(error.code === 'ECONNREFUSED') return next(new ApiError(`CONNECTION ERROR AT ${URL}`, httpStatus.BAD_REQUEST));
		if(error.response.data.message) return next(new ApiError(error.response.data.message,error.response.status));
		return next(new ApiError("AN ERROR HAS OCCURRED", httpStatus.INTERNAL_SERVER_ERROR));
  }
  // Default response if no record is present in the database
  return res.status(httpStatus.OK).render({
    title: 'PayGroup Information'
  });
});

const addEmployeeToPayGroup = catchAsyncError(async(req, res, next) => {
  const employeeId = Number(req.body.employeeId);
  const payGroupId = Number(req.body.payGroupId);
  const URL = `http://localhost:8080/api/mun/v1/paygroup/${payGroupId}/employee/${employeeId}`;

  try {
    const response = await axios({
      method:	'PUT',
      url:	URL
    });
    if(response.data.success){
      return res.status(httpStatus.OK).json({
        success: true,
        message: response.data.details
      });
    }
  } catch (error) {
    console.log(error.response)
    if(error.response.data.message) return next(new ApiError(error.response.data.message,error.response.status));
		return next(new ApiError("AN ERROR HAS OCCURRED", httpStatus.INTERNAL_SERVER_ERROR));
  }
});

module.exports = {
  createPayGroupForm,
  createPayGroup,
  getAllPayGroup,
  getPayGroup,
  addEmployeeToPayGroup
}