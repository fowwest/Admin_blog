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

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
 path: {
 type: String,
 required: true,
 trim: true
 },
 originalname: {
 type: String,
 required: true
 }
 
});
 
 
var Image = module.exports = mongoose.model('Image', imageSchema);
 
var Blog = module.exports = mongoose.model('Blog', BlogSchema);