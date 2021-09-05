const UserM = require('../models/UserM');
const PostM = require('../models/PostM');
const ErrorResponse = require('../utils/errorResponse');

const populatePost = async (post) => {
  const populatedPost = await post
    .populate('userId')
    .populate('comments.postedBy', ['_id', 'name'])
    .sort({ createdAt: -1 });
  return populatedPost;
};

exports.getMyPosts_DB = async (id) => {
  const myPosts = await populatePost(PostM.find({ userId: id }));

  return myPosts;
};
exports.getFeedPosts_DB = async (id) => {
  const user = await UserM.findById(id);
  const following = user.following.map((entry) => entry.user.toString());
  const feedPosts = await populatePost(
    PostM.find({ postedBy: { $in: following } })
  );
  return feedPosts;
};
exports.getAllPosts_DB = async () => {
  const allPosts = await populatePost(PostM.find({}));
  return allPosts;
};
exports.getSinglePostById_DB = async (postId) => {
  const allPosts = await populatePost(PostM.findOne({ _id: postId }));
  return allPosts;
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
exports.deletePost_DB = async () => {};
exports.commentOnPost_DB = async () => {};
exports.likeOrUnlikePost_DB = async () => {};
