var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var request = require('request');
var Image = mongoose.model('Image');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// Test AWS
var fs = require('fs'),
    AWS = require('aws-sdk');
    // s3 = new AWS.S3('admin-blog-assets');
// End 
    
    AWS.config.update({region: 'us-east-1'});

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

var apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://stark-citadel-59092.herokuapp.com';
}

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var renderPostPage = function(req, res, postDetail) {
  console.log(postDetail.post.image.key + ': This is key');

  var params = {Bucket: 'admin-blog-assets', Key: postDetail.post.image.key};
  var url = s3.getSignedUrl('getObject', params);
  console.log('The URL is', url);

  res.render('post-info', {
    post: postDetail.post,
    imageUrl: url
  });
};

var doAddPost = function(req, res, blog) {

  var file = req.file;                                                                                                                
  let fileData = fs.readFileSync(file.path);
  console.log(file);
  var params = {
  Bucket: 'admin-blog-assets',
  Key: file.filename,
  Body: fileData,
  ACL:'public-read'
  };
  s3.putObject(params, function (perr, pres) {
      if (perr) {
          console.log("Error uploading image: ", perr);                                                
      } else {
          console.log("uploading image successfully");                       
      }                      
  });   

  // Putting uploaded image's path and name into document
  var imagepath = {};
  imagepath['path'] = file.path;
  imagepath['originalname'] = file.originalname;
  imagepath['key'] = file.filename;

  // Pushing post image, title, and content into db
  blog.posts.push({
    image: imagepath,
    title: req.body.post_title,
    content: req.body.post_content
  });
  blog.save();

  return res.redirect('/profile');

};

// Error handler
var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find the page. Sorry.";
  } else {
    title = status + ", something's gone wrong.";
    content = "Something, somwhere, has gone just a little bit wrong";
  }
  res.status(status);
  // res.render('generic-text', {
  //   title: title,
  //   content: content
  // });
};

var getPostsInfo = function(req, res, callback) {
  var requestOptions, path;
  path = '/api/blog/posts/' + req.params.postid;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
  };
  request(requestOptions, function(err, response, body){
    var data = body; // data processing
    if (response.statusCode === 200) {
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
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
    var keyArray = [];
    var imageUrlList = [];

    if (req.session.userId) {
      isAdmin = true;
    }

    if(responseBody.posts) {

      for (i = 0; i < responseBody.posts.length; i++) {
      var imageKey = responseBody.posts[i].image.key;
      keyArray[i] = imageKey;
      }

      for (i = 0; i < keyArray.length; i ++) {
        var params = {Bucket: 'admin-blog-assets', Key: keyArray[i]};
        var url = s3.getSignedUrl('getObject', params);
        imageUrlList[i] = url;
      }

      // Render blog page
      res.render('blog', {
      isAdmin,
      posts: responseBody.posts,
      imageUrl: imageUrlList,
      postSubmitted: false
      });
    } else {
            // Render blog page
      res.render('blog', {
      isAdmin,
      posts: [],
      imageUrl: imageUrlList,
      postSubmitted: false
      });
    }


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

  /* GET posts info page */
module.exports.postInfo = function(req, res){
  getPostsInfo(req, res, function(req, res, responseData) {
    renderPostPage(req, res, responseData);
  });
};




