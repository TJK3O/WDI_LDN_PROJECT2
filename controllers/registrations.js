const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
      res.redirect('/'); // you might want to redirect to a login form
    })
    .catch(next);
}

function showRoute(req, res, next) {
  User.findById(req.params.id)
    .populate('photos')
    .then(user => {
      res.render('registrations/show', { user });
    })
    .catch(next);
}

function editRoute(req, res) {
  User.findById(req.params.id)
    .then(user => {
      res.render('registrations/edit', { user });
    });
}

function updateRoute(req, res) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.redirect(`/users/${user._id}`));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
