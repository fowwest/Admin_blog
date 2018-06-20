var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

// Blog
router.get('/blog', ctrlBlog.getBlogPosts);
 
module.exports = router;