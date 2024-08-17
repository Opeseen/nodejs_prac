const catchAsyncError = require('../utils/catchAsyncError');
const { userService, tokenService, authService } =  require('../services');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const dayjs = require('dayjs');

// Function to generate and send Token to a user
const sendUserDetailsAndToken = (user, statusCode, res) => {
  // GENERATE TOKEN FOR THE USER
  const token = tokenService.generateToken(user.id,process.env.JWT_EXPIRATION,process.env.JWT_SECRET);
  // COOKIES HANDLER
  const cookieOption = {
    expires: dayjs().add(process.env.JWT_EXPIRATION, 'days').toDate(),
    httpOnly: true
  };
  if(process.env.NODE_ENV === 'production') {cookieOption.secure =  true;}

  res.cookie('jwt', token, cookieOption); // Send the cookie at every response

  res.status(statusCode).json({
    success: true,
    user,
    token
  });
};

const signUpUser = catchAsyncError(async (req, res) => {
  // CREATE A NEW USER
  const newUser = await userService.signUpUser(req.body);
  // SEND TOKEN AND USER DETAILS
  sendUserDetailsAndToken(newUser, httpStatus.CREATED, res);
});

const loginUser = catchAsyncError(async(req, res, next) => {
  const {email, password} = req.body;

  // CHECK IF EMAIL AND PASSWORD IS PROVIDED
  if(!email || !password) {return next(new ApiError('Please provide email and password',httpStatus.BAD_REQUEST))};
  
  // CHECK LOGIN CREDENTIALS
  const user = await authService.verifyLoginCredentials(email, password);
  // SEND USER DETAILS AND TOKEN
  sendUserDetailsAndToken(user, httpStatus.OK, res);
});


module.exports = {
  signUpUser,
  loginUser
};

