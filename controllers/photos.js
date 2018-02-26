const Photo = require('../models/photo');

function indexRoute(req, res) {
  Photo.find()
    .then(photos => res.render('photos/index', { photos }));
}

function newRoute(req, res) {
  res.render('photos/new');
}

function createRoute(req, res, next) {
  Photo.create()
    .then(() => res.redirect('/photos'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute
};
