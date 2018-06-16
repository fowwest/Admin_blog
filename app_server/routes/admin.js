var express = require('express');
var router = express.Router();

var ctrlAdmin = require('../controllers/admin');
var ctrlBlog = require('../controllers/blog');

router.post('/register', ctrlAdmin.registerAdmin);
router.post('/login', ctrlAdmin.loginAdmin);

router.post('/add_post', ctrlBlog.postsCreate);

module.exports = router;
