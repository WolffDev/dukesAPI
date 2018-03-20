const Comment = require('./commentModel');

exports.get = (req, res, next) => {
	Comment.get(req.query.post_id)
		.then( result => {
			res.status(200).send({
				token: req.newToken,
				comments: result
			})
		})
		.catch(err => next(err))
}

exports.getOne = (req, res, next) => {
	Comment.findById(req.params.id)
		.then(result => {
			if(result.length == 0) return next({
				type: 'error',
				name: 'InvalidComment',
				message: 'The comment does not exists'
			})
			res.status(200).send(Object.assign({}, {token: req.newToken}, result[0]))
		})
		.catch(err => next(err))
}

exports.post = (req, res, next) => {
	Comment.save(req.body, req.query.post_id, req.user_id)
		.then( result => {
			if(result.affectedRows >= 0) {
				res.status(201).send({
					token: req.newToken,
					message: 'New comment created',
					commentId: result.insertId
				})
			} else {
				return next({
					type: 'error',
					name: 'NewCommentError',
					message: 'Something went wrong, try creating the comment again'
				})
			}
		})
		.catch(err => next(err))
}

exports.put = (req, res, next) => {
	Comment.put(req.body, req.user_id, req.params.id)
		.then(result => {
			if(result.affectedRows >= 0) {
				res.status(200).send({
					token: req.newToken,
					message: 'Comment Updated'
				})
			} else {
				return next({
					type: 'error',
					name: 'UpdateCommentError',
					message: 'Something went wrong, try updating the comment again'
				})
			}
		})
		.catch(err => next(err))
}

exports.delete = (req, res, next) => {
	Comment.remove(req.params.id, req.user_id)
		.then(result => {
			if(result.affectedRows == 0) return next({
				type: 'error',
				name: 'DeleteNoCommentExists',
				message: 'You are trying to delete a comment that does not exists'
			})
			res.status(200).send({
				token: req.newToken,
				type: 'success',
				message: 'Comment successfully deleted'
			})
		})
		.catch(err => next(err))
}