const logger = require('../util/logger');
exports.categoryPostAuthLevel = (req, res, next) => {
	logger.log('from auth level')
	if(req.body.auth_level.trim() > req.auth_level) {
		return next({
			type: 'error',
			name: 'AuthLevelIncorrect',
			message: 'You are authorized to the action you just tried'
		})
	}
	return next();
}