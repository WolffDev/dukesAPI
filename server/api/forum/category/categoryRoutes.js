const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');


const logger = require('../../../util/logger');
const controller = require('./categoryController');

router.route('/')
	.get(controller.get)
	.post(validate.categoryPost, controller.post)



module.exports = router;