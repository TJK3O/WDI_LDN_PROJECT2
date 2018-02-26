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
      res.render('photos/show', { photo });
    })
    .catch(next);
}

function editRoute(req, res) {
  Photo.findById(req.params.id)
    .then(photo => {
      res.render('photos/edit', { photo });
    });
}

function updateRoute(req, res) {
  Photo.findById(req.params.id)
    .then(photo => Object.assign(photo, req.body))
    .then(photo => photo.save())
    .then(photo => res.redirect(`/photos/${photo._id}`));
}

function deleteRoute(req, res) {
  Photo.findById(req.params.id)
    .then(photo => photo.remove())
    .then(() => res.redirect('/photos'));
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
