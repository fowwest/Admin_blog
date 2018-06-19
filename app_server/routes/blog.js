var express = require('express');
var router = express.Router();
var multer = require('multer');

var ctrlBlog = require('../controllers/blog');

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});

router.post('/add_post', ctrlBlog.postsCreate);

router.post('/', upload.any(), ctrlBlog.postsAddImage);



module.exports = router;