const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const controller = require('./commentController');
const postAndAuthCheck = require('../../../middleware/comment/postAndAuthCheck');
const commentUserCheck = require('../../../middleware/comment/commentUserCheck');

router.route('/')
	.get([validate.getCommentByPost, postAndAuthCheck], controller.get)
	.post([validate.getCommentByPost, validate.newComment, postAndAuthCheck], controller.post)

router.route('/:id')
	.get([validate.idIsNumber, authLevel(3)], controller.getOne)
	.put([validate.idIsNumber, commentUserCheck], controller.put)
	.delete([validate.idIsNumber, commentUserCheck], controller.delete)


module.exports = router;