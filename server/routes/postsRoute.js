const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts, (req, res) => {
  res.status(200).json(res.locals.allPosts)
})

router.post('/', postsController.createPost, (req, res) => {
  res.status(200).json(res.locals.createdPost);
})

router.delete('/:id', postsController.deletePost, (req, res) => {
  res.status(200);
})
module.exports = router;