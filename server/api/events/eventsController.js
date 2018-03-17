const Events = require('./eventsModel');

exports.get = (req, res, next) => {
	let offset = 0;
	if(req.query.hasOwnProperty('offset')) {
		offset = req.query.offset
	}
	Events.get(+offset)
		.then(result => {
			if(result.length == 0) return next({
				type: 'error',
				name: 'EventsQueryOffset',
				message: 'There is no events with the offset provided'
			})
			res.status(200).send(Object.assign({
					newToken: req.newToken,
					events: result
				})
			)
		})
		.catch(err => next(err))
}