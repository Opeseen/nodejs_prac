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
  const updatedUserDetails = await userService.updateCurrentUserData(req.body, req.params.id);

  return res.status(httpStatus.OK).json({
    status: "Success",
    updatedUserDetails
  });

});

const deleteUser = catchAsyncError(async(req, res, next) => {
  const user = await userService.deleteUser(req.params.username);
  if(!user){
    return next(new ApiError("No User found to delete", httpStatus.NOT_FOUND));
  };
  res.status(httpStatus.NO_CONTENT).json({
    success: true
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
  deleteUser,
  getAllUsers
};