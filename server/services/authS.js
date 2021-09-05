const bcrypt = require('bcryptjs');

const UserM = require('../models/UserM');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.createUser_DB = async (userData) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // An array is created an the first entry is the new user
    const user = (
      await UserM.create([userData], { session }).catch((err) => {
        console.log(err?.code);
        if (err.code === 11000) {
          throw new ErrorResponse(`User Already exists`, 400);
        } else {
          throw new ErrorResponse(`User Creation Failed`, 500);
        }
      })
    )[0];
    // Session has to be saved for the data to be returned
    await user.save({ session });
    console.log(user);
    await session.commitTransaction();
    session.endSession();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
exports.loginUser_DB = async (userData) => {
  const { email, password } = userData;
  try {
    const user = await UserM.findOne({ email });
    if (!user) {
      throw new ErrorResponse(`User Not Found. Email is invalid`, 404);
    }

    // Normal password then HASHED one
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ErrorResponse(`Password Incorrect`, 401);
    }
    // Create token after password matched
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return [user, token];
  } catch (error) {
    throw new ErrorResponse(error, 404);
  }
};
