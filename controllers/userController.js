/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const User = require('../models/userModel');

const userController = {};

// GET ALL USERS
userController.getAllUsers = async (req, res, next) => {
  try {
    console.log('trying to get users');
    const response = await User.find();
    console.log(response);
    res.locals.users = response;
    return next();
  } catch (err) {
    return next({
      log: 'failed to get users',
      status: 400,
      message: { err },
    });
  }
};

userController.getUserByName = async (req, res, next) => {
  const getName = req.params.name.toLowerCase();
  try {
    console.log('trying to get a user');
    const response = await User.find({ name: getName });
    console.log(response);
    res.locals.user = response;
    return next();
  } catch (err) {
    return next({
      log: 'failed to get a user',
      status: 400,
      message: { err },
    });
  }
};
userController.getUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log('ID: ', id);
  try {
    console.log('trying to get a user');
    const response = await User.findById(id);
    console.log(response);
    res.locals.user = response;
    return next();
  } catch (err) {
    return next({
      log: 'failed to get a user',
      status: 400,
      message: { err },
    });
  }
};

// CREATE A NEW USER IN DB
userController.createUser = async (req, res, next) => {
  const {
    name, username, git_id, email, imgURL,
  } = req.body;

  try {
    const create = await User.create({
      name,
      username,
      git_id,
      email,
      imgURL,
    });
    console.log(`created ${create}`);
    res.locals.createdUser = create;
    return next();
  } catch (err) {
    return next({
      log: 'Failed to create user',
      status: 400,
      message: { err },
    });
  }
};

userController.deleteUser = (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(`attempting to delete user with ID: ${id}`);
    User.findOneAndDelete({ _id: id }, (err, result) => {
      // if err occured?
      if (err) {
        return next({
          log: 'error in deleting user',
          status: 400,
          message: { err },
        });
      }
      // if no user found
      if (result === null) {
        return next({
          log: 'no user to delete',
          status: 400,
          message: { err },
        });
      }
      // if successfully deleted
      res.locals.deleted = result;
      console.log(`Deleting User: ${result}`);
      return next();
    });
  } catch (err) {
    return next({
      log: 'failed deleting user',
    });
  }
};

module.exports = userController;
