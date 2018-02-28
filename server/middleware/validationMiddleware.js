const { body, validationResult, checkSchema } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const logger = require('../util/logger');
const Joi = require('joi');
const {categoryPostSchema} = require('../api/schema/forumSchema');

// exports.categoryPost = [
// 	body('title').isLength({min:1}).exists().trim().toString(),
// 	body('body').isLength({min:1}).exists().trim().toString(),
// 	body('user_name').isLength({min:1}).exists().trim().toString(),
// 	body('category_id').isLength({min:1}).isInt().exists().trim().toInt(),
// 	body('user_id').isLength({min:1}).isInt().exists().trim().toInt(),
// 	(req, res, next) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(422).send(errors.mapped());
// 		}
// 		next();
// 	}
// ];

exports.categoryPost = (req, res, next) => {
	Joi.validate(req.body, categoryPostSchema, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'ValidationError',
			message: 'Check the post body for errors',
			details: err
		});
		// logger.log(value);
		next();
	})
}