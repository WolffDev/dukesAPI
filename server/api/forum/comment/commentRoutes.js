const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const controller = require('./commentController');
const postAndAuthCheck = require('../../../middleware/comment/postAndAuthCheck');

router.route('/')
	.get([validate.getCommentByPost, postAndAuthCheck], controller.get)
	.post([validate.getCommentByPost, validate.newComment, postAndAuthCheck], controller.post)

router.route('/:id')
	.get([validate.idIsNumber, authLevel(3)], controller.getOne)
	.put()
	.delete()


module.exports = router;