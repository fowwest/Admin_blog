var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Image = mongoose.model('Image');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getBlogPosts = function(req, res) {
	Blog
	.findById('5b249aa70d9ce26b2aba157f')
	.exec(function(err, blog){
			if (!blog) {
				sendJsonResponse(res, 404, {
						"message": "blog not found!"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			sendJsonResponse(res, 200, blog);

	});
};

module.exports.blogPostsReadOne = function(req, res) {
	if (req.params && req.params.postid) {
		Blog
		.findById('5b249aa70d9ce26b2aba157f')
		.select("posts")
		.exec(function(err, blog){
			var response, post;
			if(!blog) {
				sendJsonResponse(res, 404, {
					"message": "blog not found!"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			if (blog.posts && blog.posts.length > 0) {
				console.log(req.params.postid);
				post = blog.posts.id(req.params.postid);
				if (!post) {
					sendJsonResponse(res, 404, {
						"message": "postid not found!"
					});
				} else {
					response = {
						blog: {
							id: '5b249aa70d9ce26b2aba157f'
						},
						post: post
					};
					sendJsonResponse(res, 200, response);
				}
				
			} else {
				sendJsonResponse(res, 404, {
					"message": "No posts found!"
				});
			}	
		});
	} else {
		console.log('paramaters not entered');
		sendJsonResponse(res, 404, {
			"message": "postid required!"
		});
	}
};

