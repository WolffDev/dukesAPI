const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const logger = require('../../../util/logger');
const controller = require('./postController');
const updatePost = require('../../../middleware/post/updatePostMiddleware');
const deletePost = require('../../../middleware/post/deletePostMiddleware');
const postPost = require('../../../middleware/post/postPostMiddleware');

router.route('/')
	.get(validate.getPostByCategory, controller.get)
	.post([validate.post, postPost], controller.post)

router.route('/:id')
	.get(validate.idIsNumber, controller.getOne)
	.put([validate.post, updatePost], controller.put)
	.delete([validate.idIsNumber, deletePost], controller.delete)


module.exports = router;