const {User} = require('../models');

const signUpUser = async (userDetails) => {
  const newUser = await User.create(userDetails);
  return newUser;
};

const getUserByEmail = async(email) => {
  return await User.findOne({email}).select('+password');
};

const getuserByID = async(id) => {
  const user = await User.findById(id);
  return user;
};

const updateCurrentUserData = async (updatedUserDetails, userId) => {
  const {email, firstname, lastname} = updatedUserDetails;
  const updatedUser = await User.findByIdAndUpdate(userId, {email, firstname, lastname}, {
    new: true,
    runValidators: true
  });
  return updatedUser;
};

const deleteMyUserData = async(userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

const getAllUsers = async() => {
  return await User.find();
};

module.exports = {
  signUpUser,
  getUserByEmail,
  getuserByID,
  updateCurrentUserData,
  deleteMyUserData,
  getAllUsers
};
