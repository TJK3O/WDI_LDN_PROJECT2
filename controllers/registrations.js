const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
      res.redirect('/login');
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

function followersCreateRoute(req, res, next){
  User.findById(req.currentUser)
    .then(user => {
      user.followedUsers.push(req.body.user);
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.body.user}`))
    .catch(next);
}

function followersDeleteRoute(req, res, next){
  User.findById(req.currentUser)
    .then(user => {
      const followedUser = user.followedUsers.id(req.body.user);
      followedUser.remove();
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.body.user}`))
    .catch(next);
}

function followersShowRoute(req,res,next) {
  User.findById(req.currentUser)
    .populate({
      path: 'followedUsersPics',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .then(user => {
      res.render('followers/show', { user });
    })
    .catch(next);
}





module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  followersCreate: followersCreateRoute,
  followersDelete: followersDeleteRoute,
  followersShow: followersShowRoute
};
