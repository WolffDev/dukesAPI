const Joi = require('joi');
const schema = {};

schema.eventsQuery = Joi.object().keys({
	offset: Joi.number().integer(),
})

schema.eventById = Joi.object().keys({
	id: Joi.number().integer().required(),
})

module.exports = schema;