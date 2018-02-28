const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const followSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const schema = new mongoose.Schema({
  username: String,
  email: String,
  image: String,
  password: String,
  bio: String,
  followedUsers: [ followSchema ]
});

// set up the passwordConfirmation virtual
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // store the password on the user model temporarily so that we can access it in our pre-validate hook
    // 'this' refers to the user object
    this._passwordConfirmation = passwordConfirmation;
  });

// set up a pre-validate hook
schema.pre('validate', function checkPassword(next) {
  // check if the password has been modified and if so whether the password and the passwordConfirmation match
  // if not invalidate the passwordConfirmation, so that the validations fail
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

schema.pre('save', function hashPassword(next) {
  // if the password has been modified, it needs to be hashed
  if(this.isModified('password')) {
    // has the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  //continue to the next step (save)
  next();
});

// compareSync compares a plain text password agains the hashed one stored on the user object
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'user'
});

schema.virtual('followedUsersPics', {
  ref: 'Photo',
  localField: 'followedUsers._id',
  foreignField: 'user'
});

module.exports = mongoose.model('User', schema);
