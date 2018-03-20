const router = require('express').Router();
const controller = require('./newsController');

router.route('/')
	.get(controller.getAll)

module.exports = router;