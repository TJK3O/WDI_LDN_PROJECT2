const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const router = require('./config/router');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userAuth = require('./lib/userAuth');
const flash = require('express-flash');
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
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(expressSession({
  secret: 'ejgnJNOIoinip[OKA@@]',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(userAuth);

app.use(router);

// global error handler
app.use((err, req, res, next) => {
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err });
  next(err);
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
