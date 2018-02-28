const Joi = require('joi');

exports.categoryPostSchema = Joi.object().keys({
	title: Joi.string().required().trim(),
	body: Joi.string().required().trim(),
	auth_level: Joi.number().integer().required(),
	user_name: Joi.string().required().trim(),
	user_id: Joi.number().integer().required()
});