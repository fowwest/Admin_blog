var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var ctrlBlog = require('../controllers/blog');

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
const storage = multer.diskStorage({
 destination: './public/uploads',
 filename: function(req, file, cb) {
 cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
 }
});
 
var upload = multer({
 storage: storage
});

// Posting blog posts
// Using upload.single() method middleware to handle images

router.post('/add_post', upload.single('postimage'), ctrlBlog.postsCreate);
router.get('/blog' , ctrlBlog.blog);
router.get('/blog/posts/:postid', ctrlBlog.postInfo);
router.get('/post-submit-conf', function(req, res) {
	res.render('post-submit-conf');
});


module.exports = router;