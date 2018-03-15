const Comment = require('./commentModel');

exports.get = (req, res, next) => {
	res.status(200).send(req.query)
}