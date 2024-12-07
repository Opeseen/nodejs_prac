const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const ApiError = require('../utils/ApiError');
const { default: axios } = require('axios');
const { response } = require('express');

const listAllEmployees = catchAsyncError(async(req, res, next) => {
  let allEmployees = false;
	const URL = 'http://localhost:8080/api/mun/v1/employee/all'
	try {
		const response = await axios({
			method:	'GET',
			url:	URL
		});
		// Return response if success and employee record is present in the database
		if(response.data.success && response.data.details?.length){
			allEmployees = response.data.details;
			return res.status(httpStatus.OK).render('employees', {
				title: 'Employees',
				allEmployees
			});
		};
		// Error response for "CONNECTION ERROR" type & other error type
	} catch (error) {
		console.log(error.errors);
		if(error.code === 'ECONNREFUSED') return next(new ApiError(`CONNECTION ERROR AT ${URL}`, httpStatus.BAD_REQUEST));
		else return next("AN ERROR HAS OCCURRED", httpStatus.INTERNAL_SERVER_ERROR);
	}

	// Default response if no record is present in the database
  res.status(httpStatus.OK).render('employees', {
    title: 'Employees',
    allEmployees
  });
});

module.exports = {
  listAllEmployees
};