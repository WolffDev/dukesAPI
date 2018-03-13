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
				newToken: req.newToken,
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
					newToken: req.newToken,
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
				newToken: req.newToken,
				post: result[0]
			});
		})
		.catch( err => next(err))
}

exports.put = (req, res, next) => {
	Post.update()
		.then( result => {
			
			res.status(200).send(Object.assign(req.params, req.body))
		}) 
		.catch( err => next(err))
}