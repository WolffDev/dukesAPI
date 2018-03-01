const Joi = require('joi');

exports.categoryPostSchema = Joi.object().keys({
	title: Joi.string().required().trim(),
	created_by: Joi.number().integer().required(),
	auth_level: Joi.number().integer().required(),
});