// router allows us to send the user to a differnet route depending on the URL entered
const router = require('express').Router();
// The photos controller contains functions to help us find, create, show etc. our photos, comments, and likes
const photos = require('../controllers/photos');
// The registrations controller lets us create, and edit accounts and followers
const registrations = require('../controllers/registrations');
// The sessions controller lets us log in and out using session cookies
const sessions = require('../controllers/sessions');
// secureRoute checks the request has a userId (a user is logged in) and redirects them with a warning if not.
const secureRoute = require('../lib/secureRoute');

// If req.body doesn't contain a user send them home, else send them to photos index
router.get('/', (req, res) => {
  if(!req.currentUser) {
    res.render('pages/home');
  } else {
    res.redirect('/photos');
  }
});

// Each of these routes sends a request to our db using functions defined in the controller and authorisation defined in secureRoute.
router.route('/photos')
  .get(photos.index)
  .post(secureRoute, photos.create);

// The new route should sit above the /:id route so that 'new' isn't treated as an id
router.route('/photos/new')
  .get(secureRoute, photos.new);

router.route('/photos/:id')
  .get(photos.show)
  .put(secureRoute, photos.update)
  .delete(secureRoute, photos.delete);

router.route('/photos/:id/edit')
  .get(secureRoute, photos.edit);

router.route('/photos/:id/comments')
  .post(secureRoute, photos.commentsCreate);

router.route('/photos/:id/comments/:commentId')
  .delete(secureRoute, photos.commentsDelete);

router.route('/photos/:id/likes')
  .post(secureRoute, photos.likesCreate);

router.route('/photos/:id/likes/:likeId')
  .delete(secureRoute, photos.likesDelete);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(registrations.show)
  .put(secureRoute, registrations.update);

router.route('/users/:id/edit')
  .get(secureRoute, registrations.edit);

router.route('/users/:id/follow')
  .post(secureRoute, registrations.followersCreate)
  .delete(secureRoute, registrations.followersDelete);

router.route('/following')
  .get(secureRoute, registrations.followersShow);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
