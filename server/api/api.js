const logger = require('../util/logger');
let router = require('express').Router();

logger.log('test')
router.get('/', (req, res) => {
	res.status(200).send({
		message: 'YAYA it works',
		headers: req.headers
	})
})
module.exports = router;