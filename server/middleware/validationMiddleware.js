const logger = require('../util/logger');
const Joi = require('joi');
const { categoryPostSchema, idIsNumber, postPostSchema, getPostByCategory } = require('../api/schema/forumSchema');

exports.categoryPost = (req, res, next) => {
	if(req.body.auth_level > req.auth_level) {
		return next({
			type: 'error',
			name: 'PostAuthTooLow',
			message: 'Your authentication level is lower than the category you are trying to create'
		})
	}
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

exports.idIsNumber = (req, res, next) => {
	Joi.validate(req.params, idIsNumber, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'IdNotNumber',
			message: 'ID is not a number',
			details: err
		});
		next();
	})
}

exports.postPost = (req, res, next) => {
	Joi.validate(req.body, postPostSchema, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'NewPostError',
			message: 'Check the post body for errors',
			details: err
		});
		next();
	})
}

exports.getPostByCategory = (req, res, next) => {
	Joi.validate(req.query, getPostByCategory, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'GetPostByGategoryError',
			message: 'Check the query paramater',
			details: err
		});
		next();
	})
}