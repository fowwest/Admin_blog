var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

// Blog
router.get('/blog', ctrlBlog.getBlogPosts);
router.get('/blog/posts/:postid', ctrlBlog.blogPostsReadOne);

 
module.exports = router;