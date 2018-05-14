// This controller contains functions that help us execute our db requests. They execute a function on the request and then render the response. An error catcher stops the functions from hanging if there is a problem
const Photo = require('../models/photo');

function indexRoute(req, res) {
  Photo.find(req.query)
    .populate('user')
    .then(photos => res.render('photos/index', { photos }))
    .catch(err => console.log(err));
}

function newRoute(req, res) {
  res.render('photos/new');
}

function createRoute(req, res, next) {
  // req.currentUser comes from the userAuth 
  req.body.user = req.currentUser;
  Photo.create(req.body)
    .then(() => res.redirect('/photos'))
    .catch(next);
}

function showRoute(req, res, next) {
  Photo.findById(req.params.id)
    .populate('comments.user')
    .populate('user')
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

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;

  Photo.findById(req.params.id)
    .then(photo => {
      photo.comments.push(req.body);
      return photo.save();
    })
    .then(photo => res.redirect(`/photos/${photo._id}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next) {
  Photo.findById(req.params.id)
    .then(photo => {
      const comment = photo.comments.id(req.params.commentId);
      comment.remove();
      return photo.save();
    })
    .then(photo => res.redirect(`/photos/${photo._id}`))
    .catch(next);
}

function likesCreateRoute(req, res, next) {
  req.body.user = req.currentUser;

  Photo.findById(req.params.id)
    .then(photo => {
      photo.likes.push(req.currentUser);
      return photo.save();
    })
    .then(photo => res.redirect(`/photos/${photo._id}`))
    .catch(next);
}

// To delete your own like you can filter set the likes to be everything except your own like and then save the filtered results as the likes
function likesDeleteRoute(req, res, next) {
  Photo.findById(req.params.id)
    .then(photo => {
      photo.likes = photo.likes.filter(userId => !userId.equals(req.currentUser._id));
      return photo.save();
    })
    .then(photo => res.redirect(`/photos/${photo._id}`))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  likesCreate: likesCreateRoute,
  likesDelete: likesDeleteRoute
};
