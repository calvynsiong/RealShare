const UserM = require('../models/UserM');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const { DOCUMENT_STATUS } = require('../static/enums.js');

exports.updateUser_DB = async (id, newData) => {
  const updatedUser = await UserM.findOneAndUpdate({ _id: id }, newData, {
    new: true,
    runValidators: true,
  })
    .exec()
    .catch((err) => {
      throw err;
    });

  return updatedUser;
};
exports.deleteUser_DB = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deletedUser = await UserM.findByIdAndDelete(id, { session })
      .exec()
      .catch((err) => {
        throw err;
      });
    if (!deletedUser) {
      throw new ErrorResponse('No user with this id found', 404);
    }
    await session.commitTransaction();
    session.endSession();
    return deletedUser;
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  } finally {
    session.endSession();
  }
};

exports.getUser_DB = async (id) => {
  const user = await UserM.findById(id);
  // Make sure password does not get fetched
  const { password, updatedAt, ...userData } = user._doc;
  return userData;
};

exports.getAllUsers_DB = async () => {
  const users = await UserM.find({ status: DOCUMENT_STATUS.ACTIVE });
  // .populate('myPosts.postId')
  // .populate('liked.postId')
  // .exec();
  return users;
};

exports.followUserAndUpdate_DB = async (userId, followerId) => {
  console.log(userId, '<-Main Follower->', followerId);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Add to main user's following array
    const updatedUser = await UserM.findOneAndUpdate(
      { _id: userId },
      {
        $push: { following: { user: followerId } },
      },
      { session }
    );

    // Add to followed user's followed array
    const updatedFollowedUser = await UserM.findOneAndUpdate(
      { _id: followerId },
      { $push: { followers: { user: userId } } },
      { session }
    );
    await Promise.all([
      updatedFollowedUser.save({ session }),
      updatedUser.save({ session }),
    ]);

    await session.commitTransaction();
    session.endSession();
    console.log(
      updatedUser.following,
      '<-Updated User->',
      updatedFollowedUser.followers
    );
    return [updatedUser, updatedFollowedUser];
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new ErrorResponse('Error in following user', 500);
  } finally {
    session.endSession();
  }
};
exports.UnfollowUserAndUpdate_DB = async (userId, followerId) => {
  console.log(userId, '<-Main Follower->', followerId);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Remove from main user's following array
    const updatedUser = await UserM.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { following: { user: followerId } },
      },
      { session }
    );

    // Remove from followed user's followed array
    const updatedFollowedUser = await UserM.findOneAndUpdate(
      { _id: followerId },
      { $pull: { followers: { user: userId } } },
      { session }
    );
    await Promise.all([
      updatedFollowedUser.save({ session }),
      updatedUser.save({ session }),
    ]);

    await session.commitTransaction();
    session.endSession();
    console.log(
      updatedUser.following,
      '<-Updated User->',
      updatedFollowedUser.followers
    );
    return [updatedUser, updatedFollowedUser];
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new ErrorResponse('Error in following user', 500);
  } finally {
    session.endSession();
  }
};
// exports.checkAlreadyFollowed_DB = async (followerId,userId) => {
//   const user = await UserM.findById(userId);
//   if(user.followers.includes(followerId)){
//     return true;
//   }
// }
