const logger = require('../util/logger');
const Joi = require('joi');
const { 
	categoryPostSchema, 
	idIsNumber, 
	postSchema, 
	getPostByCategory ,
	getCommentByPost,
	newComment
} = require('../api/schema/forumSchema');

const { 
	eventsQuery,
	eventById
} = require('../api/schema/eventsSchema');

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

exports.post = (req, res, next) => {
	Joi.validate(req.body, postSchema, (err, value) => {
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
			name: 'GetPostByCategoryError',
			message: 'Check the query paramater, requires query parameter, ie. /posts?category=1 etc',
			details: err
		});
		next();
	})
}

exports.getCommentByPost = (req, res, next) => {
	Joi.validate(req.query, getCommentByPost, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'GetCommentByPostError',
			message: 'Check the query paramater, requires query parameter, ie. /comment?post_id=1 etc',
			details: err
		});
		next();
	})
}

exports.newComment = (req, res, next) => {
	Joi.validate(req.body, newComment, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'NewCommentError',
			message: 'You are missing some values, in order to post a comment',
			details: err
		});
		next();
	})
}

exports.eventsQuery = (req, res, next) => {
	Joi.validate(req.query, eventsQuery, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'EventsQueryError',
			message: 'You did not pass a valid number',
			details: err
		});
		next();
	})
}

exports.eventbyId = (req, res, next) => {
	Joi.validate(req.params, eventById, (err, value) => {
		if(err) return next({
			type: 'error',
			name: 'EventIdError',
			message: 'You did not pass a valid event id',
			details: err
		});
		next();
	})
}