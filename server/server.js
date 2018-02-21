const express = require('express');
const app = express();
const router = require('express').Router();

const api = require('./api/api');

const config = require('./config/config');
require('./middleware/appMiddleware')(app);

app.use('/api', api);


// Error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

module.exports = app;