const express = require('express');

const router = express.Router();

// register
router.route('/').get(async () => console.log('helloWorld'));

module.exports = router;
