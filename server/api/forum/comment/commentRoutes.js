const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const controller = require('./commentController');
const postAndAuthCheck = require('../../../middleware/comment/postAndAuthCheck');

router.route('/')
	.get([validate.getCommentByPost, postAndAuthCheck], controller.get)
	.post([validate.getCommentByPost, validate.newComment, postAndAuthCheck], controller.post)

router.route('/:id')
	.get()
	.put()
	.delete()


module.exports = router;