const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const logger = require('../../../util/logger');
const controller = require('./postController');

router.route('/')
	.get(validate.getPostByCategory, controller.get)
// 	.post()

// router.route('/:id')
// 	.get()
// 	.put()
// 	.delete()


module.exports = router;