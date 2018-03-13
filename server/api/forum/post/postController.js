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