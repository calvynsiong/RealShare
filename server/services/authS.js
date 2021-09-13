const bcrypt = require('bcryptjs');

const UserM = require('../models/UserM');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const mapUserInfo = require('../utils/functions');

exports.createUser_DB = async (userData) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // An array is created an the first entry is the new user
    const user = (
      await UserM.create([userData], { session }).catch((err) => {
        if (err.code === 11000) {
          throw new ErrorResponse(`User Already exists`, 400);
        } else {
          throw new ErrorResponse(`User Creation Failed`, 500);
        }
      })
    )[0];
    // Session has to be saved for the data to be returned
    await user.save({ session });
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
    let user = await UserM.findOne({ email });
    if (!user) {
      throw new ErrorResponse(`User Not Found. Email is invalid`, 404);
    }
    let userInfo = user._doc;
    const followers = await UserM.find({
      _id: {
        $in: user.followers.map((entry) => entry.user),
      },
    });
    const following = await UserM.find({
      _id: {
        $in: user.following.map((entry) => entry.user),
      },
    });
    userInfo = {
      ...userInfo,
      followers: mapUserInfo(followers),
      following: mapUserInfo(following),
    };

    // Normal password then HASHED one
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ErrorResponse(`Password Incorrect`, 401);
    }
    // Create token after password matched
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return [userInfo, token];
  } catch (error) {
    throw new ErrorResponse(error, 404);
  }
};
