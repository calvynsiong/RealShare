const bcrypt = require('bcryptjs');
// services
const { createUser_DB, loginUser_DB } = require('../services/authS');
// utils
const { sanitizer, hashPassword } = require('../utils/requestCheck');
const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

// !Route : POST /api/v1/auth/register
// *Desc: register user
exports.registerUser = asyncHandler(async (req, res) => {
  let userData = sanitizer(['username', 'email', 'password'], req.body);
  // encode password
  const hashedPassword = await hashPassword(userData.password);
  console.log(hashedPassword);
  userData = {
    ...userData,
    password: hashedPassword,
    myPosts: [],
    followers: [],
    following: [],
    myPosts: [],
    liked: [],
  };

  const user = await createUser_DB(userData);
  responseHandler(
    { statusCode: 200, payload: { user }, msg: 'User created' },
    res
  );
});
// !Route : POST /api/v1/auth/login
// *Desc: login existing user
exports.loginUser = asyncHandler(async (req, res) => {
  let userData = sanitizer(['email', 'password'], req.body);
  const user = await loginUser_DB(userData);
  responseHandler(
    { statusCode: 200, payload: { user }, msg: 'User logged in' },
    res
  );
});
