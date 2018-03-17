const express = require('express');
const app = express();
const router = require('express').Router();
// const checkToken = require('./auth/auth').checkToken;
const api = require('./api/api');
const config = require('./config/config');
const logger = require('../server/util/logger');
require('./middleware/appMiddleware')(app);

// middleware that accepts token in URI query and set it to the request header
// app.use(checkToken());

app.use('/v1', api);


// Error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
	switch (err.name) {
		case 'JsonWebTokenError':
			res.status(401).send({
				type: 'error',
				name: err.name,
				message: err.message
			});
			break;
		// case 'TokenRefreshNotAllowed':
		// 	res.status(401).send(err);
		// 	break;
		// case 'AuthLevelIncorrect':
		// 	res.status(401).send(err);
		// 	break;
		// case 'ValidationError':
		// 	res.status(401).send(err);
		// 	break;
		// case 'PostAuthTooLow':
		// 	res.status(401).send(err);
		// 	break;
		// case 'PostCategoryFailed'

	
		default:
			res.status(400).send(err);
			break;
	}
	// TODO: handle unhandle errors from MYSQL 
	// 'There was and error - contact the administrator and be sure you can reproduce the steps you took, to reach to this error'

  logger.error(err);
});

module.exports = app;