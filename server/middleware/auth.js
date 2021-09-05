const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const responseHandler = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');

exports.verifyToken = asyncHandler(async (req, res, next) => {
  const { authorization: bearerHeader } = req.headers;
  // console.log('Hello', typeof bearerHeader);

  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      await jwt.verify(
        bearerToken,
        process.env.JWT_SECRET,
        (error, payload) => {
          if (error) {
            responseHandler(
              { msg: 'Invalid token. Please log in!', statusCode: 401 },
              res
            );
          }
          // ! Obtained from jwt.sign in authS,l-52
          const { id } = payload;
          next();
        }
      );
    } else {
      throw new ErrorResponse('Invalid token. Please log in!', 401);
    }
  } catch (error) {
    return responseHandler(
      { statusCode: 401, msg: error.toString() ?? 'You are not logged in!' },
      res
    );
  }
});
