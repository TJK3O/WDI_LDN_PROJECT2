const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Photo = require('../models/photo');
const photoData = require('./data/photos');

mongoose.connect('mongodb://localhost/insta-database', (err, db) => {
  db.dropDatabase();

  Photo.create(photoData)
    .then(photos => console.log(`${photos.length} photos created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
