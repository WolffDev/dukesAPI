const logger = require('../util/logger');
module.exports = (req, res, next) => {
	if(req.body.auth_level.trim() > req.auth_level) {
		return next({
			type: 'error',
			name: 'AuthLevelIncorrect',
			message: 'Your authentication level is to low'
		})
	}
	return next();
}