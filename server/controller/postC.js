const responseHandler = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

exports.getMyPosts = asyncHandler(async (req, res, next) => {});
exports.getFeedPosts = asyncHandler(async (req, res, next) => {});
exports.getAllPosts = asyncHandler(async (req, res, next) => {});
exports.getSinglePost = asyncHandler(async (req, res, next) => {});
exports.createPost = asyncHandler(async (req, res, next) => {});
exports.commentOnPost = asyncHandler(async (req, res, next) => {});
exports.handleLikePost = asyncHandler(async (req, res, next) => {});
