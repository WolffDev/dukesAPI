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

exports.getOne = (req, res, next) => {
	const attendees = Events.eventAmount(+req.params.id);
	const event = Events.findById(+req.params.id);
	Promise.all([attendees, event])
		.then(result => {
			if(result[1].length == 0) return next({
				type: 'error',
				name: 'EventsCount',
				message: 'There is no event with the given id'
			})
			res.status(200).send(Object.assign({},
				{newToken: req.newToken},
				result[0][0],
				{attendees: result[1]}
				)
			)
		})
		.catch(err => next(err))
	
}