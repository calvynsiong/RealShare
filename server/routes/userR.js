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
// register

router.route('/update/:id').put(updateUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/find/:id').get(getUser);
router.route('/all').get(getAllUsers);
router.route('/follow/:id').put(followUser);
router.route('/unfollow/:id').put(unfollowUser);

// Follow others

module.exports = router;
