const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { hashPassword } = require('../utils/requestCheck');
// services
const {
  updateUser_DB,
  deleteUser_DB,
  getUser_DB,
  getAllUsers_DB,
  followUserAndUpdate_DB,
  UnfollowUserAndUpdate_DB,
} = require('../services/userS');

// !Route : POST /api/v1/user/update/:id
// *Desc: Update user
exports.updateUser = asyncHandler(async (req, res) => {
  const handleUpdateUser = async (req, res) => {
    // Checks if password is provided
    if (req.body.password) {
      try {
        req.body.password = await hashPassword(req.body.password);
        const updatedUser = await updateUser_DB(req.params.id, req.body);
        responseHandler(
          { statusCode: 200, payload: { updatedUser }, msg: 'User updated' },
          res
        );
      } catch (err) {
        responseHandler({ statusCode: 500, msg: err.toString() }, res);
      }
    } else {
      responseHandler({ statusCode: 409, msg: 'No password provided' }, res);
    }
  };

  // Checks same user OR admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    await handleUpdateUser(req, res);
  } else {
    responseHandler(
      { statusCode: 403, msg: "You cannot update someone else's account!" },
      res
    );
  }
});

// !Route : Delete /api/v1/user/delete/:id
// *Desc: Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  // Checks same user OR admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const deletedUser = await deleteUser_DB(req.params.id);
      responseHandler(
        {
          statusCode: 200,
          msg: 'Account successfully deleted',
          payload: { deletedUser },
        },
        res
      );
    } catch (err) {
      responseHandler({ statusCode: 500, msg: err.toString() }, res);
    }
  } else {
    responseHandler(
      { statusCode: 403, msg: "You cannot delete someone else's account!" },
      res
    );
  }
});

// !Route : Get /api/v1/user/find/:id
// *Desc: Find user by Id
exports.getUser = asyncHandler(async (req, res) => {
  try {
    const user = await getUser_DB(req.params.id);
    responseHandler(
      {
        statusCode: 200,
        msg: 'User found',
        payload: { user },
      },
      res
    );
  } catch (err) {
    responseHandler({ statusCode: 500, msg: err.toString() }, res);
  }
});
// !Route : Get /api/v1/user/all/
// *Desc: Find all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await getAllUsers_DB();
    responseHandler(
      {
        statusCode: 200,
        msg: `${users.length} users found`,
        payload: { users },
      },
      res
    );
  } catch (err) {
    responseHandler({ statusCode: 500, msg: err.toString() }, res);
  }
});
// ! Helper
const handleUserFollowAndUnfollow = async (req, res, action) => {
  // To be followed/unfollowed user id;
  const id = req.params.id;
  // Main user id
  const userId = req.body.userId;

  if (userId === id) {
    responseHandler(
      { statusCode: 403, msg: `You cannot ${action} yourself!` },
      res
    );
    return;
  }

  const user = await getUser_DB(userId);
  const peopleImFollowing = user.following.map((entry) =>
    entry.user.toString()
  );
  // ! Only if trying to follow and checks if main user is already following
  if (action === 'follow' && peopleImFollowing.includes(id)) {
    responseHandler(
      { statusCode: 409, msg: `You already ${action} user ${id}!` },
      res
    );
    return;
  }
  if (action === 'follow') {
    const [updatedUser, followedUser] = await followUserAndUpdate_DB(
      userId,
      id
    );
    responseHandler(
      {
        statusCode: 200,
        msg: `User ${id} followed`,
        payload: {
          updatedUser: updatedUser.following,
          followedUser: followedUser.followers,
        },
      },
      res
    );
    return;
  }
  // ! Only if trying to unfollow and checks if not following the person
  console.log('FOLLOWERS?', !peopleImFollowing.includes(id));
  if (!peopleImFollowing.includes(id)) {
    responseHandler(
      { statusCode: 409, msg: `You don't follow user ${id}!` },
      res
    );
    return;
  }
  const [updatedUser, unfollowedUser] = await UnfollowUserAndUpdate_DB(
    userId,
    id
  );
  responseHandler(
    {
      statusCode: 200,
      msg: `User ${userId} unfollowed`,
      payload: {
        updatedUser: updatedUser.following,
        unfollowedUser: unfollowedUser.followers,
      },
    },
    res
  );
};

// !Route : Get /api/v1/follow/:id
// *Desc: Follow others
exports.followUser = asyncHandler(async (req, res) => {
  try {
    await handleUserFollowAndUnfollow(req, res, 'follow');
  } catch (err) {
    console.log(err);
    responseHandler({ statusCode: 500, msg: err.toString() }, res);
  }
});
// !Route : Get /api/v1/unfollow/:id
// *Desc: Unfollow others
exports.unfollowUser = asyncHandler(async (req, res) => {
  try {
    await handleUserFollowAndUnfollow(req, res, 'unfollow');
  } catch (err) {
    console.log(err);
    responseHandler({ statusCode: 500, msg: err.toString() }, res);
  }
});
