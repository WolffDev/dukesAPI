const Categories = require('./categoryModel');


exports.get = (req, res, next) => {
	Categories.getCategories(req.auth_level)
		.then(modelRes => {
			if(modelRes[0].length == 0) return;
			res.status(200).send({
				newToken: req.body.newToken,
				categories: modelRes[0]
			});
		})
		.catch(err => next(err))
}

exports.post = (req, res, next) => {
	
}