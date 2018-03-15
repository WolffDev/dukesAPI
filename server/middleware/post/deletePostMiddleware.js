const { getAutherFromPost, getAuthLevelFromPost } = require('../../api/forum/post/postModel');

module.exports = (req, res, next) => {
	getAutherFromPost(req.params.id)
		.then( result => {
			if(result[0].user_id === +req.user_id) return next()
		})
		.catch(err => next(err))

	getAuthLevelFromPost(req.params.id)
		.then( result => {
			if(result[0].auth_level <= +req.auth_level) return next();
			next({
				type: 'error',
				name: 'DeletePostInvalidAuthLevel',
				message: 'You are not authorized to delete this post'
			})
		})
		.catch( err => next(err))
}