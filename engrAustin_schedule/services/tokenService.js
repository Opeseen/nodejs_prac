const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

// Function to generate Token
const generateToken = (userId, expires, secret) => {
  const payload = {
    sub: userId,
    exp: dayjs().add(expires,'days').unix(),
  };

  return jwt.sign(payload,secret);
};

module.exports = {
  generateToken,
};