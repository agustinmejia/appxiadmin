const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database, port } = require('./config');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'zppxiadminsecret',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use('/links', require('./routes/links.routes'));
app.use('/customers', require('./routes/customers.routes'));
app.use('/drivers', require('./routes/drivers.routes'));
app.use('/services', require('./routes/services.routes'));
app.use('/map', require('./routes/map.routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;