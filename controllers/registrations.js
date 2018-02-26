const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then(() => res.redirect('/')) // you might want to redirect to a login form
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
