const router = require('express').Router();

const logger = require('../util/logger');


router.get('/', (req, res) => {
	res.status(200).send({
		message: 'YAYA it works',
		test: process.env.JWT_EXPIRE
	})
})
module.exports = router;