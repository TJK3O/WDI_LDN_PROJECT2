const router = require('express').Router();
const photos = require('../controllers/photos');

router.get('/', (req, res) => res.render('pages/home'));

router.route('/photos')
  .get(photos.index)
  .post(photos.create);

router.route('/photos/new')
  .get(photos.new);

router.route('/photos/:id')
  .get(photos.show)
  .put(photos.update)
  .delete(photos.delete);

router.route('/photos/:id/edit')
  .get(photos.edit);

module.exports = router;
