var express = require('express');
var router = express.Router();

var ctrlAdmin = require('../controllers/admin');
var ctrlBlog = require('../controllers/blog');

router.post('/register', ctrlAdmin.registerAdmin);
router.post('/login', ctrlAdmin.loginAdmin);

module.exports = router;
