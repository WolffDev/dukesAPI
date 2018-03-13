const jwt = require('jsonwebtoken');
const config = require('../config/config');
const AuthModel = require('./authModel');
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
		// TODO: handle if no authorization header is present
		let token = req.headers.authorization.split('Bearer ')[1];
		jwt.verify(token, config.secret.jwt, (err, decoded) => {
			// Token is valid.
			// Decoding user_id and auth_level for further use in request
			// signing new token => setting new req.body = newToken, should be used in the response
			if(decoded) {
				logger.log('token still valid');
				let id = decoded.data.user.id;
				req.user_id = id;
				req.auth_level = decoded.data.user.auth_level;
				logger.log('before signNewToken');
				req.newToken = signNewToken(decoded);
				next();
				return;
			}

			// Token is valid but EXPIRED
			// Decoding user_id and auth_level for further use in request
			// signing new token => setting new req.body = newToken, should be used in the response
			if(err.name === 'TokenExpiredError') {
				logger.log('token expired')
				decoded = jwt.decode(token)
				let userId = decoded.data.user.id;
				let refreshToken = decoded.data.user.refresh_token;
				AuthModel.checkRefreshToken(userId, refreshToken)
					.then( modelRes => {
						// TODO: handle if refreshToken is inactive
						// TODO: handle is user account is hacked!!! -> write a log file with location and ip info
						// res.send(modelRes[0]);return;
						if(modelRes[0].length == 0) {
							next({
								type: 'error',
								name: 'TokenRefreshNotAllowed',
								message: 'User is not authorized to refresh token. Contact the administrator'
							})
							return;
						} else {
							req.user_id = userId;
							req.auth_level = decoded.data.user.auth_level;
							req.newToken = signNewToken(decoded);
							next();
							return;
						}
					})
					.catch(err => next(err));
			}
			// Invalid token => calling next() for error handling, and passing the error
			if(err.name !== 'TokenExpiredError') return next(err);
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
		data: {
			user: {
				id: decodedToken.data.user.id,
				auth_level: decodedToken.data.user.auth_level,
				refresh_token: decodedToken.data.user.refresh_token
			}
		}
	}, process.env.JWT);
	return newToken;
}