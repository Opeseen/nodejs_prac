const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } =  require('../services');
const catchAsyncError = require('../utils/catchAsyncError');

const updateCurrentUserData = catchAsyncError(async(req, res, next) => {
  // Throw an error if user tries to update a password with this handler.
  if(req.body.password || req.body.passwordConfirm) { 
    return next(new ApiError('This route is not for password update. Please use the /updatePassword', httpStatus.BAD_REQUEST)); 
  };
  // This will update the user details
  const updatedUserDetails = await userService.updateCurrentUserData(req.body, req.user.id);

  return res.status(httpStatus.OK).json({
    status: "Success",
    updatedUserDetails
  });

});

const deleteMyUserData = catchAsyncError(async(req, res) => {
  await userService.deleteMyUserData(req.user.id);

  res.status(httpStatus.NO_CONTENT).json({
    status: "Success",
    data: null
  });
});

const getAllUsers = catchAsyncError(async(req, res) => {
  // return all users from collection
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).json({
    status: 'Success',
    results: users.length,
    users
  });
});


module.exports = {
  updateCurrentUserData,
  deleteMyUserData,
  getAllUsers
};