const express = require('express');

const router = express.Router();

const { registerUser } = require('../controller/authC');

// register
router.route('/register').post();

module.exports = router;
