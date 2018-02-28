const router = require('express').Router();
const photos = require('../controllers/photos');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => {
  if(!req.currentUser) {
    res.render('pages/home');
  } else {
    res.redirect('/photos');
  }
});

router.route('/photos')
  .get(photos.index)
  .post(secureRoute, photos.create);

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
  .post(secureRoute, registrations.followersCreate);

router.route('/users/:id/follow/:followingId')
  .delete(secureRoute, registrations.followersDelete);

router.route('/following')
  .get(secureRoute, registrations.followersShow);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
