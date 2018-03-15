const { getCommentAuthor } = require('../../api/forum/comment/commentModel');

module.exports = (req, res, next) => {
	getCommentAuthor(req.params.id)
		.then(result => {
			if(result.length == 0) return next({
				type: 'error',
				name: 'InvalidComment',
				message: 'No such comment exists'
			})
			if(req.auth_level >= 3) return next()
			if(result[0].user_id !== +req.user_id) return next({
				type: 'error',
				name: 'InvalidCommentAuthor',
				message: 'You are not the author of this comment, and you are not allowed to update/delete it'
			})
			next()
		})
}