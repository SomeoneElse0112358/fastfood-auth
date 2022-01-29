const session = require('express-session');
const mongoStore = require('connect-mongo');
const { database, secretSession } = require('./config.js');

module.exports = session({
  secret: secretSession,
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    mongoUrl: database.url
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
});
