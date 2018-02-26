const Photo = require('../models/photo');

function indexRoute(req, res) {
  Photo.find()
    .then(photos => res.render('photos/index', { photos }))
    .catch(err => console.log(err));
}

function newRoute(req, res) {
  res.render('photos/new');
}

function createRoute(req, res, next) {
  console.log(req.body);
  Photo.create(req.body)
    .then(() => res.redirect('/photos'))
    .catch(next);
}

function showRoute(req, res, next) {
  Photo.findById(req.params.id)
    .then(photo => {
      console.log(photo);
      res.render('photos/show', { photo });
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute
};
