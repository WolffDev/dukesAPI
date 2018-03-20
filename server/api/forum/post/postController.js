const Post = require('./postModel');

exports.get = (req, res, next) => {
	Post.getPostByCategory(req.query.category, req.auth_level)
		.then( result => {
			if(result.length == 0) {
				return next({
					type: 'error',
					name: 'PostAccessInvalid',
					message: 'You are trying to access a post with a category you do not have access to or do not exists'
				})
			}
			res.status(200).send({
				token: req.newToken,
				posts: result
			});
		})
		.catch(err => next(err))
}
exports.post = (req, res, next) => {
	Post.save(req.user_id, req.body, req.body.category_id, req.auth_level)
		.then( result => {
			if(result.affectedRows == 0) {
				return next({
					type: 'error',
					name: 'NewPostErrorInvalidCategory',
					message: 'Cannot create a new post. Either you are trying to create a new post with a category you are not authorized to, or something else went wrong'
				})
			} else {
				res.status(201).send({
					token: req.newToken,
					insertId: result.insertId
				})
			}
		})
		.catch(err => console.log(err))
}

exports.getOne = (req, res, next) => {
	Post.findById(req.params.id, req.auth_level)
		.then( result => {
			if(result.length == 0) {
				return next({
					type: 'error',
					name: 'SinglePostError',
					message: 'The post you are trying to access does not exist or you do not have the proper authorization'
				})
			}
			res.status(200).send({
				token: req.newToken,
				post: result[0]
			});
		})
		.catch( err => next(err))
}

exports.put = (req, res, next) => {
	Post.update(req.body, req.params.id, req.user_id)
		.then( result => {
			if(result.affectedRows == 0) next({
				type: 'error',
				name: 'UpdateError',
				message: 'Something went wrong, try again or contact the admin'
			})
			res.status(201).send({
				token: req.newToken,
				type: 'success',
				message: 'Post succesfully updated'
			});
		}) 
		.catch( err => next(err))
}

exports.delete = (req, res, next) => {
	Post.remove(req.params.id, req.user_id)
		.then( result => {
			if(result.affectedRows == 0) return next({
				type: 'error',
				name: 'DeleteNoPostExists',
				message: 'You are trying to delete a post that does not exists'
			})
			res.status(200).send({
				token: req.newToken,
				type: 'success',
				message: 'Post successfully deleted'
			})
		})
		.catch( err => next(err))
}