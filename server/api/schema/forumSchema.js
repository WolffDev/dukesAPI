const Joi = require('joi');

exports.categoryPostSchema = Joi.object().keys({
	title: Joi.string().required(),
	body: Joi.string().required(),
	category_id: Joi.number().required(),
	user_name: Joi.string().required(),
	user_id: Joi.number().required()
});