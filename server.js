require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);
//Passport Stratergy
require('./passport/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');
// Routes
app.use('/auth', authRoutes);
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
	app.listen(PORT, function() {
		console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
	});
});

module.exports = app;
