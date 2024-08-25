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

const updateCurrentUserData = async (updatedUserDetails, user) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserDetails, {
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
  getUserByEmail,
  getuserByID,
  updateCurrentUserData,
  deleteUser,
  getAllUsers
};
