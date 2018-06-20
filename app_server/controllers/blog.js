var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var request = require('request');
var Image = mongoose.model('Image');

var apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://infinite-springs-12949.herokuapp.com';
}

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var doAddPost = function(req, res, blog) {

  // Getting Uploaded images path and name
  var path = './uploads/' + req.file.filename;
  var imageName = req.file.originalname;

  // Putting uploaded image's path and name into document
  var imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;

  // Pushing post image, title, and content into db
  blog.posts.push({
    image: imagepath,
    title: req.body.post_title,
    content: req.body.post_content
  });
  blog.save();
  return res.redirect('/blog');
};

module.exports.postsCreate = function(req, res, next) {

    Blog
    .findById('5b249aa70d9ce26b2aba157f')
    .select('posts')
    .exec(function(err, blog){
    if (err) {
        console.log('error');
      } else {
        doAddPost(req, res, blog);
      }
    });
};

var renderBlogpage = function(req, res, responseBody) {

    // Flag for admin
    var isAdmin = false;
    if (req.session.userId) {
      isAdmin = true;
    }

    // Render blog page
    res.render('blog', {
    isAdmin,
    posts: responseBody.posts
  });
};

/* GET blog page */
module.exports.blog = function(req, res){

  // GET blog posts through api
  var requestOptions, path;
  path = '/api/blog';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {

    }
  };

  // body is json data returned from api
  request(requestOptions, function(err, response, body){
    var data, i;
    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    data = body;
    console.log(body);
    renderBlogpage(req, res, data);
  });
};



