const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const checkObjectId = require('../../middleware/checkObjectId');

//for new post
router.post(
  '/',
  check('Title', 'Title is required').notEmpty(),
  check('Content', 'Content is required').notEmpty(),
  check('Author', 'Author is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        Title,
        Content,
        Author,
              }=req.body;
        

      const newPost = new Post({
        Title,
        Content,
        Author,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//for getting all the post by date which they are created
router.get('/',  async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//to get a particular post by id
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


//to delete a post by its id
router.delete('/:id', [checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }


    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


//to update a post
router.put('/:id', checkObjectId('id'), async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    const {
      Title,
      Content,
      Author,
            }=req.body;
      
    const UpdateAt = Date.now();
     post= {
      Title:Title,
      Content:Content,
      Author:Author,
      UpdateAt,
    }

    await Post.updateOne(post);

    res.json(Post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




module.exports = router;
