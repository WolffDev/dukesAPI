const { getAuthLevelFromPost } = require('../../api/forum/post/postModel');

module.exports = (req, res, next) => {
	getAuthLevelFromPost(req.query.post_id)
		.then( result => {
			if(result[0].auth_level <= req.auth_level) {
				next();
			} else {
				next({
					type: 'error',
					name: 'CommentInvalidAuth',
					message: 'You are not allowed to view comments from this post'
				})
			}
		})
		.catch( err => next(err))
	
}