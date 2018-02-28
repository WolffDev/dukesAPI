const { body, validationResult, checkSchema } = require('express-validator/check');
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
	body('title').isLength({min:1}).exists().trim().toString(),
	body('body').isLength({min:1}).exists().trim().toString(),
	body('user_name').isLength({min:1}).exists().trim().toString(),
	body('category_id').isLength({min:1}).isInt().exists().trim().toInt(),
	body('user_id').isLength({min:1}).isInt().exists().trim().toInt(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.mapped());
		}
		next();
	}
];