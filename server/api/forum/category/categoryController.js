const Category = require('./categoryModel');
const logger = require('../../../util/logger');

exports.get = (req, res, next) => {
	Category.getAll(req.auth_level)
		.then( categories => {
			res.status(200).send({
				newToken: req.newToken,
				categories: categories
			});
		})
		.catch(err => console.log(err))
}

exports.getOne = (req, res, next) => {
	Category.findById(req.params.id, req.auth_level)
		.then( category => {
			if(category.length == 0) return next({
				type: 'error',
				name: 'NoCategoryExists',
				message: 'Wrong ID, there is no existing category with the given ID'
			});
			res.status(200).send({
				newToken: req.newToken,
				category: category
			})
		})
		.catch(err => next(err))
}

exports.post = (req, res, next) => {
	Category.save(req.body)
		.then( category => {
			if(category.affectedRows == 0) {
				next({
					type: "error",
					name: "PostCategoryFailed",
					message: "There was an error creating the category. Try again or contact the administrator with the error name"
				})
			} else {
				res.status(201).send({
					newToken: req.newToken,
					type: "success",
					message: "New category created"
				})
			}
		})
		.catch( err => next(err))
}

exports.put = (req, res, next) => {
	Category.update(req.body, req.params.id, req.auth_level)
		.then( result => {
			if(result.affectedRows == 0) {
				next({
					type: "error",
					name: "UpdateWrongId",
					message: "There was an error updating the category. Either the ID does not exists, your authorization is to low or another error occured"
				})
			} else {
				res.status(200).send({
					newToken: req.newToken,
					type: "success",
					message: "Category Updated"
				})
			}
		})
		.catch( err => next(err));
}

exports.delete = (req, res, next) => {
	Category.remove(req.params.id, req.auth_level)
		.then( result => {
			if(result.affectedRows == 0) {
				next({
					type: "error",
					name: "DeleteWrongId",
					message: "There was an error deleting the category. Either the ID does not exists, your authorization is to low or another error occured"
				})
			} else {
				res.status(200).send({
					newToken: req.newToken,
					type: "success",
					message: "Category Deleted"
				})
			}
		})
}