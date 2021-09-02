const express = require('express');

const router = express.Router();

// register
router.route('/login').get((req, res) => {
  console.log('helloWorld');
  return res.end('Hello World');
});

module.exports = router;
