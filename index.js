const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');
const photos = require('./db/data/photos');

const app = express();
const PORT = 8000;

// link to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/insta-database');

app.use(express.static(`${__dirname}/public`));
// set up express layouts
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// listen for template
app.get('/', (req, res) => res.render('pages/home'));
app.get('/photos', (req, res) => res.render('photos/index', { photos }));

app.get('/photos/new', (req, res) => res.render('photos/new'));
app.post('/photos', (req, res) => res.render(''));

app.use(router);
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
