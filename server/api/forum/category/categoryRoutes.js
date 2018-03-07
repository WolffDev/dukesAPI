const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const logger = require('../../../util/logger');
const controller = require('./categoryController');

router.route('/')
	.get(controller.get)
	.post([validate.categoryPost, authLevel()], controller.post)

router.route('/:id')
	.get(validate.idIsNumber, controller.getOne)
	.put([validate.idIsNumber, validate.categoryPost, authLevel()], controller.put)
	.delete([validate.idIsNumber, authLevel()], controller.delete)



module.exports = router;