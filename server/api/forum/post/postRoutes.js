const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const logger = require('../../../util/logger');
const controller = require('./postController');

router.route('/')
	.get(validate.getPostByCategory, controller.get)
	.post(validate.post, controller.post)
// 	.post()

router.route('/:id')
	.get(validate.idIsNumber, controller.getOne)
	// TODO: check if Post creator or auth >= 3
	.put(validate.post, controller.put)
	.delete(validate.idIsNumber, controller.delete)


module.exports = router;