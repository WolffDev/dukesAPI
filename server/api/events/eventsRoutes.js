const router = require('express').Router();
const controller = require('./eventsController');
const validate = require('../../middleware/validationMiddleware');

router.route('/')
	.get(validate.eventsQuery, controller.get)



module.exports = router;