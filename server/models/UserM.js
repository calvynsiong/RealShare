const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { DOCUMENT_STATUS } = require('../static/enums');

const UserSchema = new mongoose.Schema(
  {
    // default settings
    schemaType: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(DOCUMENT_STATUS),
      default: DOCUMENT_STATUS.ACTIVE,
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
      min: 4,
      max: 30,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      min: 8,
      select: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      default: `https://avatars.dicebear.com/api/gridy/:${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')}.svg`,
    },
    followers: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
        },
      },
    ],
    following: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    myPosts: [
      {
        postId: {
          type: mongoose.Schema.ObjectId,
          ref: 'posts',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema, 'users');