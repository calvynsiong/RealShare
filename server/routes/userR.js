const express = require('express');

const router = express.Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require('../controller/userC');
// register

router.route('/update/:id').put(updateUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/find/:id').get(getUser);
router.route('/all').get(getAllUsers);

module.exports = router;
