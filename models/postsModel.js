const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  posterID: { type: String, required: true },
  postContent: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model('Posts', postSchema);
module.exports = Post;
