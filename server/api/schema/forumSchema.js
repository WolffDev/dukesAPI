const Joi = require('joi');
const schema = {};
schema.categoryPostSchema = Joi.object().keys({
	title: Joi.string().required().trim(),
	auth_level: Joi.number().integer().required(),
});

schema.idIsNumber = Joi.object().keys({
	id: Joi.number().integer().required(),
});

schema.getPostByCategory = Joi.object().keys({
	category: Joi.number().integer().required(),
})

schema.postSchema = Joi.object().keys({
	title: Joi.string().required(),
	body: Joi.string().required(),
	category_id: Joi.number().integer().required(),
	user_name: Joi.string().required(),
})

module.exports = schema;