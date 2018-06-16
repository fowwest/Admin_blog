var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ctrlAdmin = require('../controllers/admin');
var ctrlBlog = require('../controllers/blog');

var Admin = mongoose.model('Admin');
var Blog = mongoose.model('Blog');


/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.session.userId) {

    console.log(req.session.userId)

  } else {

    console.log('session was destroyed')

  }

  res.render('index', { title: 'Express' });
}); 

/* Admin routes */

router.get('/register', function(req, res, next) {

  res.render('register', { title: 'Express' });  

}); 

router.get('/login', function(req, res, next) {

  res.render('login', { title: 'Express' });

});

router.get('/profile', ctrlAdmin.requiresLogin , ctrlAdmin.getProfile);

router.get('/logout', ctrlAdmin.logout);


/* Blog routes */

router.get('/blog' , ctrlBlog.blog);

module.exports = router;

