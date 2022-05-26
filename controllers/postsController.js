/* eslint-disable no-console */
/* eslint-disable consistent-return */
const Post = require('../models/postsModel');

const postsController = {};

// GET POSTS FROM DATABASE
postsController.getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    res.locals.allPosts = allPosts;
    return next();
  } catch (err) {
    return next({
      log: 'Error Getting All Posts',
      status: 400,
      message: { err },
    });
  }
};

// CREATE POSTS TO DATABASE
postsController.createPost = async (req, res, next) => {
  const { posterID, postContent, postTime } = req.body;
  try {
    await Post.create({
      posterID,
      postContent,
      created_at: postTime,
    });
    return next();
  } catch (err) {
    return next({
      log: 'Error Creating Post',
      status: 400,
      message: { err },
    });
  }
};

// DELETE POSTS FROM DATABASE
postsController.deletePost = (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(`Trying to delete post with ID of ${id}`);
    Post.findOneAndDelete({ _id: id }, (err, result) => {
      // Error handler
      if (err) {
        return next({
          log: 'FAILED TO DELETE POST',
          status: 400,
          message: { err },
        });
      }
      // If nothing to delete:
      if (result === null) {
        return next({
          log: 'Nothing to delete',
          status: 400,
          message: { err },
        });
      }
      // Successful Deletes:

      console.log(`deleted ${result}`);
      return next();
    });
  } catch (err) {
    return next({
      log: 'Failed to delete post',
      status: 400,
      message: { err },
    });
  }
};

module.exports = postsController;
