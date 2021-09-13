const mongoose = require('mongoose');
const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const {
  getMyPosts_DB,
  getFeedPosts_DB,
  getAllPosts_DB,
  getSinglePostById_DB,
  createPost_DB,
  commentOnPost_DB,
  getMyLikedPosts_DB,
  deletePost_DB,
  likeOrUnlikePost_DB,
} = require('../services/postS');
const { sanitizer, removeNull } = require('../utils/requestCheck');
const ErrorResponse = require('../utils/errorResponse');

// !Route : POST /api/v1/post/create
exports.createPost = asyncHandler(async (req, res, next) => {
  try {
    const postData = removeNull(sanitizer(['img', 'desc', 'userId'], req.body));
    const newPost = await createPost_DB(postData);
    return responseHandler(
      {
        statusCode: 200,
        payload: { newPost },
        msg: `Post created with ${newPost.img}`,
      },
      res
    );
  } catch (error) {
    return responseHandler(
      {
        statusCode: 500,
        msg: error.message ?? error.toString(),
      },
      res
    );
  }
});
// !Route : Delete /api/v1/post/delete/:postid
exports.deletePost = asyncHandler(async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const deletedPost = await deletePost_DB(userId, postId);
    return responseHandler(
      {
        statusCode: 200,
        msg: `Image ${deletedPost?.image} has been deleted`,
        payload: { deletedPost },
      },
      res
    );
  } catch (err) {
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});
// !Route : GET /api/v1/post/myPosts/:id

exports.getMyPosts = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const myPosts = await getMyPosts_DB(id);
    return responseHandler(
      {
        statusCode: 200,
        msg: `${myPosts.length} of my posts retrieved`,
        payload: { myPosts },
      },
      res
    );
  } catch (err) {
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});
// !Route : GET /api/v1/post/myPosts/:id

exports.getAllLikedPosts = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const likedPosts = await getMyLikedPosts_DB(id);
    return responseHandler(
      {
        statusCode: 200,
        msg: `${likedPosts.length} of my liked posts retrieved`,
        payload: { likedPosts },
      },
      res
    );
  } catch (err) {
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});

// !Route : GET /api/v1/post/feed/:id
exports.getFeedPosts = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedPosts = await getFeedPosts_DB(id);
    return responseHandler(
      {
        statusCode: 200,
        msg: `${feedPosts.length} posts on your feed has been retrieved`,
        payload: { feedPosts },
      },
      res
    );
  } catch (err) {
    console.log(err);
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});
// !Route : GET /api/v1/post/all
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const allPosts = await getAllPosts_DB();
    return responseHandler(
      {
        statusCode: 200,
        msg: `${allPosts.length} posts retrieved`,
        payload: { allPosts },
      },
      res
    );
  } catch (err) {
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});
// !Route : GET /api/v1/post/single/:postId
exports.getSinglePost = asyncHandler(async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await getSinglePostById_DB(postId);
    return responseHandler(
      {
        statusCode: 200,
        msg: `${post.img} retrieved. Desc: ${post.desc}`,
        payload: { post },
      },
      res
    );
  } catch (err) {
    return responseHandler(
      {
        statusCode: 500,
        msg: err.message ?? err.toString(),
      },
      res
    );
  }
});
exports.commentOnPost = asyncHandler(async (req, res, next) => {
  try {
    const { text, userId } = req.body;
    const { postId } = req.params;
    const updatedPost = await commentOnPost_DB({ text, userId }, postId);
    return responseHandler(
      {
        statusCode: 200,
        msg: `The comment was made on post ${updatedPost.img}`,
        payload: { updatedPost },
      },
      res
    );
  } catch (error) {
    return responseHandler(
      {
        statusCode: 500,
        msg: error.message ?? error.toString(),
      },
      res
    );
  }
});

// !Route : GET /api/v1/post//likeOrUnlike/:postId
exports.handleLikeAndDislikePost = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    const [updatedPost, action] = await likeOrUnlikePost_DB(userId, postId);
    return responseHandler(
      {
        statusCode: 200,
        msg: `Post has been ${action}`,
        payload: { updatedPost },
      },
      res
    );
  } catch (error) {
    console.log(error);
    throw new ErrorResponse(error ?? error.toString());
  }
});
