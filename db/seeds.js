const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = require('../models/user');
const userData = require('./data/users');

mongoose.connect('mongodb://localhost/insta-database', (err, db) => {
  db.dropDatabase();

  User.create(userData)
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
