// models
const UserM = require('../models/UserM');
// utils
const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const next = require('next');
const app = next({ dir: '../../client/', dev: true });

// !Route : POST /api/v1/auth/register
// *Desc: register fake user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = new UserM({
    username: 'aaClvyn',
    email: 'calvyn364@gmail.com',
    password: 'password',
  });
  user.save();
  responseHandler(
    { statusCode: 200, payload: { user }, msg: 'Dummy User' },
    res
  );
});
