const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      // if the user cannot be found, or did not supply a valid password
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.redirect('/login'); // send them back to the login page
      }
      req.session.userId = user._id;
      req.flash('info', `Welcome back, ${user.username}!`);
      res.redirect('/following'); // otherwise send them to the homepage
    })
    .catch(next);
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: sessionsCreate,
  delete: sessionsDelete
};
