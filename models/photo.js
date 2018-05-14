const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// Here we create a function for use in the photos show template so that users can only delete their own comments. It compares the id of the current user to the userId supplied in the request to see if they match
commentSchema.methods.isOwnedBy = function(user) {
  return user && this.user && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: String,
  description: String,
  comments: [ commentSchema ],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

// The isLikedBy function is used in the photo show template to check whether the current user likes the current photo. It allows a user to like or unlike a photo
schema.methods.isLikedBy = function(user) {
  // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
  return user && this.likes.some(userId => userId.equals(user._id));
};

// This allows us to check a user uploaded the photo being shown
// schema.method.ownsPhotos = function(photo) {
//   return photo && this.user && photo._id.equals(this.user._id);
// };

module.exports = mongoose.model('Photo', schema);
