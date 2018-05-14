const express = require('express');
// Enables EJS templating
const expressLayouts = require('express-ejs-layouts');
// Enables session authentication using cookies
const expressSession = require('express-session');
const router = require('./config/router');
const bodyParser = require('body-parser');
// Forms can only be send as GET or POST so we use method-override to allow PUT, DELETE etc.
const methodOverride = require('method-override');
const userAuth = require('./lib/userAuth');
const flash = require('express-flash');
const app = express();
const PORT = process.env.PORT || 8000;

// link to db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/insta-database');

// This tells our app where to look or static files like js, css, etc.
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
app.use((err, req, res, next) => { // eslint-disable-line
  console.log(err);
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err });
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
