const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

commentSchema.methods.isOwnedBy = function(user) {
  return user && this.user && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  image: String,
  description: String,
  comments: [ commentSchema ],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

schema.methods.isLikedBy = function(user) {
  return user && this.likes.some(userId => userId.equals(user._id));
};

module.exports = mongoose.model('Photo', schema);
