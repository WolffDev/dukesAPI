const Comment = require('./commentModel');

exports.get = (req, res, next) => {
	Comment.get(req.query.post_id)
		.then( result => {
			res.status(200).send({
				newToken: req.newToken,
				comments: result
			})
		})
		.catch(err => next(err))
}