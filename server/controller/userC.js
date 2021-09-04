const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { hashPassword } = require('../utils/requestCheck');
// services
const {
  updateUser_DB,
  deleteUser_DB,
  getUser_DB,
  getAllUsers_DB,
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
// !Route : Get /api/v1/user/all/:id
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
