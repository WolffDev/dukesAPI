const router = require('express').Router();
const validate = require('../../../middleware/validationMiddleware');
const authLevel = require('../../../middleware/validateAuthLevel');
const logger = require('../../../util/logger');
const controller = require('./categoryController');

// router.param('id', (req, res, next, lolo) => {
// 	console.log("from PARAM");
// 	console.log(req.query);
// 	console.log(lolo);
// 	next();
// })

router.route('/')
	.get(controller.get)
	.post([validate.categoryPost, authLevel(3)], controller.post)
	
router.route('/check')
	.get(controller.checkPermission)
	
router.route('/:id')
	.get(validate.idIsNumber, controller.getOne) 
	.put([validate.idIsNumber, validate.categoryPost, authLevel(3)], controller.put)
	.delete([validate.idIsNumber, authLevel(3)], controller.delete)




module.exports = router;