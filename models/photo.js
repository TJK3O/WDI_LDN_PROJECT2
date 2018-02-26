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
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Photo', schema);
