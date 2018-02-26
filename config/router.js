const router = require('express').Router();
const photos = require('../controllers/photos');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('pages/home'));

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

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
