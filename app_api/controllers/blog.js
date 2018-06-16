var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

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