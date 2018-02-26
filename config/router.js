const router = require('express').Router();
const photos = require('../db/data/photos');

router.get('/', (req, res) => res.render('pages/home'));

router.get('/photos', (req, res) => res.render('photos/index', photos.index));

module.exports = router;
