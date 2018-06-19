var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var request = require('request');
var Image = mongoose.model('Image');

var apiOptions = {
  server: 'http://localhost:3000'
};

// if (process.env.NODE_ENV === 'production') {
//   apiOptions.server = 'https://infinite-springs-12949.herokuapp.com';
// }

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var doAddPost = function(req, res, blog) {
  blog.posts.push({
    title: req.body.post_title,
    content: req.body.post_content
  });
  blog.save();
  return res.redirect('/blog');
};

var doAddImage = function(image, callback) {
 Image.create(image, callback);
}

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

module.exports.postsCreate = function(req, res) {
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

module.exports.postsAddImage = function(req, res, next) {
 
  res.send(req.files);
   
  /*req.files has the information regarding the file you are uploading...
  from the total information, i am just using the path and the imageName to store in the mongo collection(table)
  */
  var path = req.files[0].path;
  var imageName = req.files[0].originalname;

  var imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;

  //imagepath contains two objects, path and the imageName

  //we are passing two objects in the addImage method.. which is defined above..
  doAddImage(imagepath, function(err) {

  });
 
};
