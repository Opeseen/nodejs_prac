const {User} = require('../models');

const signUpUser = async (userDetails) => {
  const newUser = await User.create(userDetails);
  return newUser;
};

const getUserByUsername = async(username) => {
  return await User.findOne({username}).select('+password');
};

const getuserByID = async(id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

const updateCurrentUserData = async (updatedUserDetails, user) => {
  const updatedUser = await User.findByIdAndUpdate(user, updatedUserDetails, {
    new: true,
    runValidators: true
  });
  return updatedUser;
};

const deleteUser = async(user) => {
  return await User.findOneAndDelete({username: user});
};

const getAllUsers = async() => {
  return await User.find();
};

module.exports = {
  signUpUser,
  getUserByUsername,
  getuserByID,
  updateCurrentUserData,
  deleteUser,
  getAllUsers
};
