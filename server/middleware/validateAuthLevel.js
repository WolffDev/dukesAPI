const logger = require('../util/logger');
exports.categoryPostAuthLevel = (req, res, next) => {
	if(req.body.category_id > req.auth_level) {
		return next({
			type: 'error',
			name: 'AuthLevelIncorrect',
			message: 'You are authorized to the action you just tried'
		})
	}
	return next();
}