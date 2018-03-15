const { getAuthLevelFromPost } = require('../../api/forum/post/postModel');

module.exports = (req, res, next) => {
	getAuthLevelFromPost(req.query.post_id)
		.then( result => {
			console.log(result);
			if(result.length == 0) {
				return next({
					type: 'error',
					name: 'CommentInvalidPost',
					message: 'The post does not exsist'
				})
			}
			if(result[0].auth_level <= req.auth_level) {
				return next();
			} else {
				return next({
					type: 'error',
					name: 'CommentInvalidAuth',
					message: 'Your authentication is invalid'
				})
			}
		})
		.catch( err => next(err))
	
}