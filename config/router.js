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

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
