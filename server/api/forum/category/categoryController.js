const Categories = require('./categoryModel');

exports.get = (req, res, next) => {
	Categories.getCategories(req.auth_level)
		.then(categories => {
			if(categories[0].length == 0) return;
			res.status(200).send({
				newToken: req.body.newToken,
				categories: categories[0]
			});
		})
		.catch(err => next(err))
}

exports.post = (req, res, next) => {
	res.status(200).send(req.body);
}