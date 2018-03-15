const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const logger = require('../../../util/logger');
const controller = require('./postController');
const updatePost = require('../../../middleware/updatePostMiddleware')

router.route('/')
	.get(validate.getPostByCategory, controller.get)
	.post(validate.post, controller.post)
// 	.post()

router.route('/:id')
	.get(validate.idIsNumber, controller.getOne)
	.put([validate.post, updatePost], controller.put)
	.delete(validate.idIsNumber, controller.delete)


module.exports = router;