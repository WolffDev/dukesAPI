// This middleware validates the authentication level required for a given route.
// If no value is passed to the middleware, then it defaults to auth_level 4.
// This middleware compared the argument to the auth_level passed from the JWT token.
// Level 4 is for DukesDenmark board members and admins.

const logger = require('../util/logger');
module.exports = (authLevel = 4) => {
	return (req, res, next) => {
		if(req.auth_level < authLevel) {
			return next({
				type: 'error',
				name: 'AuthLevelIncorrect',
				message: 'Your authentication level is to low'
			})
		}
		return next();
	}
}