const Joi = require('joi');
const schema = {};

schema.eventsQuery = Joi.object().keys({
	offset: Joi.number().integer(),
})

module.exports = schema;