const userService = require('./userService');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyLoginCredentials = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError('Incorrect username or password', httpStatus.UNAUTHORIZED);
  };
  return user;
};

module.exports = {
  verifyLoginCredentials,
};
