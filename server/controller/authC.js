const { responseHandler } = require('../utils/responseHandler');
const { asyncHandler } = require('../utils/asyncHandler');

exports.registerUser = asyncHandler(async (req, res, next) => {
  console.log('Hello World');
});
