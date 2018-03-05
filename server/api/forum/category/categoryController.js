const Categories = require('./categoryModel');
const logger = require('../../../util/logger');

exports.get = (req, res, next) => {
	Categories.getCategories(req.auth_level)
		.then( categories => {
			logger.log('false return from controller model')
			// console.log(categories);
			if(categories[0].length == 0) return;
			res.status(200).send({
				newToken: req.newToken,
				categories: categories
			});
		})
		.catch(err => console.log(err))
}

exports.post = (req, res, next) => {
	Categories.newCategory(req.body)
		.then( category => {
			if(category[0].length == 0) return;
			res.status(200).send({
				newToken: req.newToken,
				categoryId: category[0].insertId
			});
		})
}