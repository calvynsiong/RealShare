const mongoose = require('mongoose');
const UserM = require('../models/UserM');
const PostM = require('../models/PostM');
const ErrorResponse = require('../utils/errorResponse');

const populatePost = async (post) => {
  const populatedPost = await post
    .populate('userId', ['_id', 'username', 'avatar'])
    .populate('comments.userId', ['_id', 'username'])
    .populate('likes', ['_id', 'username'])
    .sort({ createdAt: -1 });
  return populatedPost;
};

exports.getMyPosts_DB = async (id) => {
  const myPosts = await populatePost(PostM.find({ userId: id }));

  return myPosts;
};
exports.getFeedPosts_DB = async (id) => {
  const user = await UserM.findById(id);
  console.log(user);

  const following = user.following.map((entry) => entry.user.toString());
  const feedPosts = await populatePost(
    PostM.find({ userId: { $in: following } })
  );
  console.log(feedPosts, following);
  return feedPosts;
};
exports.getAllPosts_DB = async () => {
  const allPosts = await populatePost(PostM.find({}));
  return allPosts;
};
exports.getSinglePostById_DB = async (postId) => {
  console.log(postId);
  const allPosts = await populatePost(
    PostM.findOne({ _id: postId.replace(/^\s+|\s+$/g, '') })
  );
  return allPosts;
};
exports.getMyLikedPosts_DB = async (userId) => {
  const likedPosts = await populatePost(PostM.find({ user: userId }));
  return likedPosts;
};
exports.createPost_DB = async (postData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  // img + desc are in postData as well
  try {
    const newPost = (
      await PostM.create(
        [
          {
            ...postData,
            comments: [],
            likes: [],
          },
        ],
        { session }
      )
    )[0];
    await newPost.save({ session });
    await session.commitTransaction();
    session.endSession();
    console.log(newPost);
    return newPost;
  } catch (error) {
    await session.abortTransaction();
    throw new ErrorResponse('Transaction failed', 500);
  } finally {
    session.endSession();
  }
};
exports.deletePost_DB = async (userId, postId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await UserM.findById(userId);
    const postToBeDeleted = await PostM.findById(postId);
    console.log(userId, postToBeDeleted.userId);
    console.log('Cannot be deleted?');
    // If user is not an admin OR not the owner of the post
    if (!(user.isAdmin || userId === postToBeDeleted.userId.toString())) {
      throw new ErrorResponse('Not authorized to deleted this post', 403);
    }

    if (!postToBeDeleted) {
      throw new ErrorResponse('No post with this id exists', 404);
    }

    const deletedPost = await PostM.findByIdAndDelete(postId, { session })
      .exec()
      .catch((err) => {
        throw err;
      });
    await session.commitTransaction();
    session.endSession();
    return deletedPost;
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  } finally {
    session.endSession();
  }
};
exports.commentOnPost_DB = async (comment, postId) => {
  console.log(postId, typeof postId, comment.text);
  try {
    const updatedPost = await populatePost(
      PostM.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: comment } },
        { runValidators: true, new: true }
      )
    );
    console.log(updatedPost);
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw new ErrorResponse(error, 404);
  }
};
exports.likeOrUnlikePost_DB = async (userId, postId) => {
  console.log(userId, postId, mongoose.Types.ObjectId(userId));
  // Unlikes if already liked
  try {
    const post = await PostM.findById(postId);
    console.log(post, 'post', postId);
    if (!post) {
      throw new ErrorResponse('No post with this id exists', 404);
    }
    let updatedPost;
    const postLikes = post.likes.map((like) => like.toString());
    console.log(postLikes, 'postLikes');
    let action;
    console.log(postLikes);
    if (postLikes.includes(userId)) {
      await PostM.findByIdAndUpdate(postId, {
        $pull: { likes: mongoose.Types.ObjectId(userId) },
      });

      action = 'disliked';
    }
    // Likes if not liked yet
    else {
      await PostM.findByIdAndUpdate(postId, {
        $push: { likes: mongoose.Types.ObjectId(userId) },
      });

      action = 'liked';
    }
    updatedPost = await populatePost(PostM.findById(postId));
    return [updatedPost, action];
  } catch (error) {
    throw new ErrorResponse(error, 500);
  }
};
