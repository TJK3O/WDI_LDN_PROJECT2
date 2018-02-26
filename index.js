const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
