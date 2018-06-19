var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

// Blog
router.get('/blog', ctrlBlog.getBlogPosts);

//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
router.get('/images', function(req, res) {
//calling the function from index.js class using routes object..
ctrlBlog.getImages(function(err, genres) {
if (err) {
throw err;
 
}
res.json(genres);
 
});
});
 
// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
router.get('/images/:id', function(req, res) {
 
//calling the function from index.js class using routes object..
ctrlBlog.getImageById(req.params.id, function(err, genres) {
if (err) {
throw err;
}
//res.download(genres.path);
res.send(genres.path)
});
});

module.exports = router;