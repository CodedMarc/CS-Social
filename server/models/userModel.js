/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, match: /.+\@.+\..+/, unique: true,
  },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
