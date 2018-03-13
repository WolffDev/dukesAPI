const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const logger = require('../../../util/logger');
const controller = require('./categoryController');

router.route('/')
	.get(controller.get)
	.post([validate.categoryPost, authLevel(3)], controller.post)

router.route('/:id')
	.get(validate.idIsNumber, controller.getOne) 
	.put([validate.idIsNumber, validate.categoryPost, authLevel(3)], controller.put)
	.delete([validate.idIsNumber, authLevel(3)], controller.delete)



module.exports = router;