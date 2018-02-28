const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const logger = require('../util/logger');

// exports.categoryPostValidation = () => {
// 	return (req, res, next) => {
// 		logger.log(req.body.user_id);
// 		check(req.body.user_id).isEmail().withMessage('must be email');
// 		const errors = validationResult(req);
// 		logger.log('fra vali');
// 		if (!errors.isEmpty()) {
// 			return next(errors.mapped);
// 		}
// 		logger.log(errors);
// 		next();
			
// 	}
// }

exports.categoryPost = [
	body('user_id').isNumeric(),
	(req, res, next) => {
		const errors = validationResult(req);
		logger.log(errors)
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.mapped());
		}
		next();
	}
]