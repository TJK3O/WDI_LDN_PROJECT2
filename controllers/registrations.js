// The registrations controller contains functions for creating, showing, editing etc a user and following/unfollowing a user
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
  req.currentUser.followedUsers.push(req.params.id);
  req.currentUser.save()
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

// To delete a followed user, we request all followed users, then filter by every user except the req.params.id (user whose page we are currently on) and saving this as users
function followersDeleteRoute(req, res, next){
  req.currentUser.followedUsers = req.currentUser.followedUsers.filter(userId => {
    return !userId.equals(req.params.id);
  });
  req.currentUser.save()
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

function followersShowRoute(req,res,next) {
  User.findById(req.currentUser)
  // We can populate just the specific parts of the record we are after so that the response is lighter - we don't need the whole user record to show what users they are following
    .populate({
      path: 'followedUsersPics',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .then(user => {
      // If the followed user doesn't have any pics then we will set it to an empty array to avoid an error
      user.followedUsersPics = user.followedUsersPics || [];
      user.followedUsersPics = user.followedUsersPics.reduce((flattened, pics) => {
        return flattened.concat(pics);
      }, []);
      // reduce, flatten and concatenate are being used to turn an array of both objects and arrays into a single array of objects
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
