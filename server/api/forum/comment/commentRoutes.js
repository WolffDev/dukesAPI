const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const controller = require('./commentController');
const getComments = require('../../../middleware/comment/getCommentsByPostMiddleware');

router.route('/')
	.get([validate.getCommentByPost, getComments], controller.get)
	.post()

router.route('/:id')
	.get()
	.put()
	.delete()


module.exports = router;