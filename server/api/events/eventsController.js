const Events = require('./eventsModel');

exports.get = (req, res, next) => {
	let offset = 0;
	if(req.query.hasOwnProperty('offset')) {
		offset = req.query.offset
	}
	Events.get(+offset)
		.then(result => {
			res.send(result)
		})
		.catch(err => next(err))
}