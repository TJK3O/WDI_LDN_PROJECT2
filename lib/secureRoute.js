// This single function checks a users session cookie for a userId and if not found redirects them and creates a flash message
function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  next();
}

module.exports = secureRoute;
