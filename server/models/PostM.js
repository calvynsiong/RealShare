const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
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
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
      default: '',
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    comments: [
      {
        text: String,
        userId: { type: mongoose.Types.ObjectId, ref: 'users' },
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('posts', PostSchema);
