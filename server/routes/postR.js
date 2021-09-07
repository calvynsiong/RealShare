const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  getMyPosts,
  getFeedPosts,
  getAllPosts,
  getSinglePost,
  createPost,
  commentOnPost,
  handleLikeAndDislikePost,
  getAllLikedPosts,
  deletePost,
} = require('../controller/postC');

const router = express.Router();

// register
// Give id in params
router.route('/myPosts/:id').get(verifyToken, getMyPosts);
// Give id in params
router.route('/feed/:id').get(verifyToken, getFeedPosts);
router.route('/all').get(verifyToken, getAllPosts);
router.route('/bookmark/:id').get(verifyToken, getAllLikedPosts);
// Give postId in params
router.route('/single/:postId').get(verifyToken, getSinglePost);
// Give img,desc,userId in body
router.route('/create').post(verifyToken, createPost);
// Give postId in params + userId in body
router.route('/delete/:postId').delete(verifyToken, deletePost);
// Give postId in params + text,userId in body
router.route('/comment/:postId').put(verifyToken, commentOnPost);
// Give postId in params + userId in body
router
  .route('/likeOrUnlike/:postId')
  .put(verifyToken, handleLikeAndDislikePost);

module.exports = router;
