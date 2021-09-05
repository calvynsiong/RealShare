const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  getMyPosts,
  getFeedPosts,
  getAllPosts,
  getSinglePost,
  createPost,
  commentOnPost,
  handleLikePost,
  deletePost,
} = require('../controller/postC');

const router = express.Router();

// register
router.route('/myPosts/:id').get(verifyToken, getMyPosts);
router.route('/feed/:id').get(verifyToken, getFeedPosts);
router.route('/all').get(verifyToken, getAllPosts);
router.route('/single/:postId').get(verifyToken, getSinglePost);
router.route('/create').post(verifyToken, createPost);
router.route('/delete/:postId').delete(verifyToken, deletePost);
router.route('/comment/:postId').put(verifyToken, commentOnPost);
router.route('/likeOrUnlike/postId').put(verifyToken, handleLikePost);

module.exports = router;
