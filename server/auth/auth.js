const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const authModel = require('./authModel');
const logger = require('../util/logger');

// middleware that accepts token in URI query and set it to the request header
exports.checkToken = () => {
	return (req, res, next) => {
		// if (req.query && req.query.hasOwnProperty('access_token')) {
    //   req.headers.authorization = 'Bearer ' + req.query.access_token;
		// }
		// logger.log('hej fra checktoken');
		next();
	}
}

// Verifies the token or send an error
exports.verifyToken = () => {
	return (req, res, next) => {
		let token = req.headers.authorization.split('Bearer ')[1];
		jwt.verify(token, config.secret.jwt, (err, decoded) => {
			// Token is valid.
			// Decoding user_id and auth_level for further use in request
			// signing new token => setting new req.body = newToken, should be used in the response
			if(decoded) {
				logger.log('token still valid');
				logger.log(test);
				req.userId = decoded.user.id;
				req.authLevel = decoded.user.auth_level;
				req.body.newToken = signNewToken(decoded);
				next();
				return;
			}
			// Token is valid but EXPIRED
			// Decoding user_id and auth_level for further use in request
			// signing new token => setting new req.body = newToken, should be used in the response
			if(err.name === 'TokenExpiredError') {
				logger.log('token expired')
				decoded = jwt.decode(token)
				req.userId = decoded.user.id;
				req.authLevel = decoded.user.auth_level;
				req.body.newToken = signNewToken(decoded);
				next();
				return;
			}
			// Invalid token => calling next() for error handling, and passing the error
			if(err.name !== 'TokenExpiredError') next(err);
		})
		
	};
};

function signNewToken(decodedToken) {
	logger.log('signing new token');
	let newToken = jwt.sign({
		iss: 'https://dukesdenmark.dk',
		iat: Math.floor(Date.now() / 1000),
		nbf: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRE),
		user: {
			id: decodedToken.user.id,
			auth_level: decodedToken.user.auth_level
		}
	}, process.env.JWT);
	return newToken;
}