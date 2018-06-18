var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

var BlogSchema = new mongoose.Schema({
    posts: [PostSchema]
})
 
var Blog = module.exports = mongoose.model('Blog', BlogSchema);