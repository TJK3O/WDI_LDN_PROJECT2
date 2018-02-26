const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  image: String,
  description: String
});

module.exports = mongoose.model('Photo', schema);
