const Joi = require('joi');
const schema = {};
schema.categoryPostSchema = Joi.object().keys({
	title: Joi.string().required().trim(),
	created_by: Joi.number().integer().required(),
	auth_level: Joi.number().integer().required(),
});

schema.idIsNumber = Joi.object().keys({
	id: Joi.number().integer().required()
})

module.exports = schema;