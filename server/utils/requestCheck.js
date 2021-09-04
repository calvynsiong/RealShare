const ErrorResponse = require('./errorResponse');
const bcrypt = require('bcryptjs');

// Checks for parameter
exports.paramCheck = (keys, obj) => {
  if (keys.length === 0) {
    throw new ErrorResponse(`Parameter(s) not found`, 400);
  }
  keys.forEach((param) => {
    if (!(param in obj)) {
      throw new ErrorResponse(`${param} is a required paramater`, 400);
    }
  });
};

//  Only accepts the keys specificed
exports.sanitizer = (saveKeys, obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (saveKeys.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

// Removes null key value pairs in req.body
exports.removeNull = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

// Checks if a model exists
exports.doesExist = (obj, model) => {
  if (!obj) {
    throw new ErrorResponse(`${model} not found.`, 404);
  }
};

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
