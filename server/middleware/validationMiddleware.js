const logger = require('../util/logger');
const Joi = require('joi');
const { categoryPostSchema } = require('../api/schema/forumSchema');

exports.categoryPost = (req, res, next) => {
	Joi.validate(req.body, categoryPostSchema, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'ValidationError',
			message: 'Check the post body for errors',
			details: err
		});
		// logger.log(req.body);
		next();
	})
}