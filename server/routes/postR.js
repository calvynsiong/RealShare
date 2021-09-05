const express = require('express');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// register
router.route('/myPosts/:id').get(verifyToken);
router.route('/feed').get(verifyToken);
router.route('/all').get(verifyToken);
router.route('/single/:postId').get(verifyToken);
router.route('/create').post(verifyToken);
router.route('/delete/:postId').delete(verifyToken);
router.route('/comment/:postId').put(verifyToken);
router.route('/likeOrUnlike/postId').put(verifyToken);

module.exports = router;
