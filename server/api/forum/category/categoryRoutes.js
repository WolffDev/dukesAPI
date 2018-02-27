const router = require('express').Router();
const logger = require('../../../util/logger');
const controller = require('./categoryController');

router.route('/')
	.get(controller.get)
	.post()



module.exports = router;