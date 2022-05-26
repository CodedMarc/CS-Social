/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  git_id: { type: String, required: true, unique: true },
  email: {
    type: String, required: false, default: null,
  },
  imgURL: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});
userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);
module.exports = User;
