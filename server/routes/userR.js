const express = require('express');
const UserM = require('../models/UserM');
const responseHandler = require('../utils/responseHandler');

const router = express.Router();

// register
router.route('/login').get((req, res) => {
  const user = new UserM({
    username: 'Calsvyn',
    email: 'calvyn360@gmail.com',
    password: 'password',
  });
  user.save();
  responseHandler(
    { statusCode: 200, payload: { user }, msg: 'Dummy User' },
    res
  );
});

module.exports = router;
