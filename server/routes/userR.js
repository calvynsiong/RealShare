const express = require('express');

const router = express.Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  followUser,
  unfollowUser,
} = require('../controller/userC');
const { verifyToken } = require('../middleware/auth');
// register

router.route('/update/:id').put(verifyToken, updateUser);
router.route('/delete/:id').delete(verifyToken, deleteUser);
router.route('/find/:id').get(verifyToken, getUser);
router.route('/all').get(getAllUsers);
router.route('/follow/:id').put(verifyToken, followUser);
router.route('/unfollow/:id').put(verifyToken, unfollowUser);

// Follow others

module.exports = router;
