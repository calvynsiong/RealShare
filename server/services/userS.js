const UserM = require('../models/UserM');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const { DOCUMENT_STATUS } = require('../static/enums.js');
const mapUserInfo = require('../utils/functions');

exports.getAllUsers_DB = async () => {
  const users = await UserM.find({ status: DOCUMENT_STATUS.ACTIVE });
  // .populate('myPosts.postId')
  // .populate('liked.postId')
  // .exec();
  return users;
};
const cleanUpEmptyFollowers = async (userId) => {
  // Gets all valid ids
  const users = await UserM.find({ status: DOCUMENT_STATUS.ACTIVE });
  const allIds = users.map((user) => user._id.toString());
  // Obtains users + following/followers
  const mainUser = await UserM.findById(userId);

  const followers = mainUser.followers.map((entry) => entry.user.toString());
  const following = mainUser.following.map((entry) => entry.user.toString());
  // Removes follower id if none-existent in db
  for (const id of followers) {
    if (!allIds.includes(id)) {
      await mainUser.updateOne({ $pull: { followers: { user: id } } });
    }
  }
  // Removes following id if none-existent in db
  for (const id of following) {
    if (!allIds.includes(id)) {
      await mainUser.updateOne({ $pull: { following: { user: id } } });
    }
  }
};

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
  await cleanUpEmptyFollowers(id);
  let { password, updatedAt, ...userData } = user._doc;
  const followers = await UserM.find({
    _id: {
      $in: userData.followers.map((entry) => entry.user),
    },
  });
  const following = await UserM.find({
    _id: {
      $in: userData.following.map((entry) => entry.user),
    },
  });
  userData.followers = mapUserInfo(followers);
  userData.following = mapUserInfo(following);
  return userData;
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
