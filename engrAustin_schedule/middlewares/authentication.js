const catchAsyncError = require('../utils/catchAsyncError');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const {userService} = require('../services');

const  loginAuthentication = catchAsyncError(async(req, res, next) => {
  let token;
  const authorizationHeader = req.headers.authorization; // GET THE TOKEN FROM THE HEADER
  if (authorizationHeader && authorizationHeader.startsWith('Bearer')){
    token = authorizationHeader.split(' ')[1];
  };

  if(!token) {return next(new ApiError('You are not login. Please login to get authorized', httpStatus.UNAUTHORIZED))};

  // VERIFY TOKEN
  const verifiedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// CHECK IF THE USER STILL EXISTS USING THE JWT SUBJECT
  const currentUser = await userService.getuserByID(verifiedToken.sub);
  if(!currentUser) {return next(new ApiError('Oops!: The user no longer exists', httpStatus.UNAUTHORIZED))};

  // CHECK IF USER CHANGE PASSWORD AFTER THE TOKEN WAS ISSUED
  if(currentUser.changedPasswordAfter(verifiedToken.iat)) {return next(new ApiError('Oops!: User recently changed his password - Please login again', httpStatus.UNAUTHORIZED))};

  req.user = currentUser.username;
  res.locals.user = currentUser.username;
  next();

});

const isLoginAuth = async(req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    try {
      // VERIFY TOKEN
      const verifiedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      // CHECK IF THE USER STILL  EXISTS USING THE JWT SUBJECT
      const currentUser = await userService.getuserByID(verifiedToken.sub);
      if(!currentUser) {return next(new ApiError('Oops!: The user no longer exists', httpStatus.UNAUTHORIZED))};

      // CHECK IF USER CHANGE PASSWORD AFTER THE TOKEN WAS ISSUED
      if(currentUser.changedPasswordAfter(verifiedToken.iat)) {return next(new ApiError('Oops!: User recently changed his password - Please login again', httpStatus.UNAUTHORIZED))};

      // THERE IS A LOGIN USER
      res.locals.user = currentUser.username;
      return next();
    } catch (error) {
      return next();
    };
  };
  next(new ApiError('You are not login. Please Login to get authorized', httpStatus.UNAUTHORIZED));
  // next()
};

const homepageAuth = async(req,res,next) => {
  const token = req.cookies.jwt;
  if(token){
    try {
      // VERIFY TOKEN
      const verifiedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      // CHECK IF THE USER STILL  EXISTS USING THE JWT SUBJECT
      const currentUser = await userService.getuserByID(verifiedToken.sub);
      if(!currentUser) {return next(new ApiError('Oops!: The user no longer exists', httpStatus.UNAUTHORIZED))};

      // CHECK IF USER CHANGE PASSWORD AFTER THE TOKEN WAS ISSUED
      if(currentUser.changedPasswordAfter(verifiedToken.iat)) {return next(new ApiError('Oops!: User recently changed his password - Please login again', httpStatus.UNAUTHORIZED))};

      // THERE IS A LOGIN USER - SO DISPLAY THE HOMEPAGE FOR A LOGIN USER
      res.locals.user = currentUser.username;
      return next();
    } catch (error) {
      return next();
    }
  };

  next();
};

const redirectIfLogin = async(req,res,next) => {
  const token = req.cookies.jwt;
  if(token){
    try {
      // VERIFY TOKEN
      const verifiedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      // CHECK IF THE USER STILL  EXISTS USING THE JWT SUBJECT
      const currentUser = await userService.getuserByID(verifiedToken.sub);
      if(!currentUser) {return next(new ApiError('Oops!: The user no longer exists', httpStatus.UNAUTHORIZED))};

      // CHECK IF USER CHANGE PASSWORD AFTER THE TOKEN WAS ISSUED
      if(currentUser.changedPasswordAfter(verifiedToken.iat)) {return next(new ApiError('Oops!: User recently changed his password - Please login again', httpStatus.UNAUTHORIZED))};

      // THERE IS A LOGIN USER - SO REDIRECT TO HOMEPAGE
      return res.redirect('/');

    } catch (error) {
      return next();
    }
  };

  next();
};

module.exports = {
  loginAuthentication,
  isLoginAuth,
  homepageAuth,
  redirectIfLogin
};