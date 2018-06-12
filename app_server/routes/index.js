var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
}); 

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// GET route after registering
router.get('/profile', requiresLogin , function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
      	res.render('profile', { name: user.username, isUser: true});
        // return res.json({ name: user.username, email: user.email });
      }
    });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;

