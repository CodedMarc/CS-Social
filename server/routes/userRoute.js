const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// GET ALL USERS
router.get('/', userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

// GET ONE USER
router.get('/:name', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

// CREATE A USER
router.post('/', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.createdUser);
});

// DELETE A USER
router.delete('/:id', userController.deleteUser, (req, res) => {
  res.status(200).json(res.locals.deleted);
});

module.exports = router;
