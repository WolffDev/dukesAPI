const News = require('./newsModel');

exports.getAll = (req, res, next) => {
	News.getAllBySlug('mobil-nyheder', 5, 0)
		.then(result => {
			if(result.length == 0) return next({
				type: 'error',
				name: 'NewsBySlug',
				message: 'There are no news posted at this time'
			})
			res.status(200).send(Object.assign({
				token: req.newToken,
				news: result
			}))
		})
		.catch(err => next(err))
}