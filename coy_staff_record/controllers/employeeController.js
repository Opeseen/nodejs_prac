const httpStatus = require('http-status');
const catchAsyncError = require('../utils/catchAsyncError');
const ApiError = require('../utils/ApiError');
const { default: axios } = require('axios');

const getAllEmployees = catchAsyncError(async(req, res, next) => {
  let allEmployees = false;
	const URL = 'http://localhost:8080/api/mun/v1/employee/all'
	try {
		const response = await axios({
			method:	'GET',
			url:	URL
		});
		// Return if response === "success" and employee record is present in the database
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
		return next(new ApiError("AN ERROR HAS OCCURRED", httpStatus.INTERNAL_SERVER_ERROR));
	}

	// Default response if no record is present in the database
  res.status(httpStatus.OK).render('employees', {
    title: 'Employees',
    allEmployees
  });
});

const getEmployee = catchAsyncError(async(req, res, next) => {
	let employeeDetails = false;
	let employeePayGroupDetails = false;
	const eid = req.query.eid;
	const FETCH_EMPLOYEE_DATA = `http://localhost:8080/api/mun/v1/employee/${eid}`
	const FETCH_EMPLOYEE_PAYGROUP_DATA = `http://localhost:8080/api/mun/v1/employee/${eid}/paygroup`
	// Fetching Multiple request to get an employee and their payGroup 
	try {
		const [responseDataOne, responseDataTwo] = await Promise.all([
			axios.get(FETCH_EMPLOYEE_DATA),
			axios.get(FETCH_EMPLOYEE_PAYGROUP_DATA)
		]);
		if(responseDataOne.data.success){
			employeeDetails = responseDataOne.data.details;
			employeePayGroupDetails = responseDataTwo.data.details !== null ? responseDataTwo.data.details : false
			return res.status(httpStatus.OK).render('employeeDetails', {
				title: 'Employee Info',
				employeeDetails,
				employeePayGroupDetails
			});
		}
	} catch (error) {
		console.log(error.response.data)
		if(error.code === 'ECONNREFUSED') return next(new ApiError(`CONNECTION ERROR AT ${URL}`, httpStatus.BAD_REQUEST));
		if(error.response.data.message) return next(new ApiError(error.response.data.message,httpStatus.BAD_REQUEST));
		return next(new ApiError("AN ERROR HAS OCCURRED", httpStatus.INTERNAL_SERVER_ERROR));
	}

	// Default response if no record is present in the database
  res.status(httpStatus.OK).render('employeeDetails', {
    title: 'Employee Info'
  });
});

const updateEmployee = catchAsyncError(async(req, res, next) => {
	const id = req.body.id;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const phone = req.body.phone;
	const email = req.body.email;
	const address = req.body.address;
	const state = req.body.state;
	const city = req.body.city;
	const nationality = req.body.nationality;
	// Check if PayLoad Data Exists
	if(!(id && firstname && lastname && phone && email && address && state && city && nationality)) return next(new ApiError("Incomplete Payload Data in request", httpStatus.BAD_REQUEST));
	try {
		const response = await axios({
      method: 'PUT',
      url: `http://localhost:8080/api/mun/v1/employee/${id}`,
      data: {
        firstname,
        lastname,
        phone,
        email,
        address,
        state,
        city,
        nationality
      }
    });
    if(response.data.success){
      res.status(httpStatus.OK).json({
				success: true
			});
		}
	} catch (error) {
		console.log(error)
		if(error.code === 'ECONNREFUSED') return next(new ApiError(`CONNECTION ERROR AT ${URL}`, httpStatus.BAD_REQUEST));
		if(error.response.data.message) return next(new ApiError(error.response.data.message,httpStatus.BAD_REQUEST));
		return next(new ApiError("Error Occurred While Updating Employee Data", httpStatus.INTERNAL_SERVER_ERROR));
	}
});


module.exports = {
  getAllEmployees,
	getEmployee,
	updateEmployee
};