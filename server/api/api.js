const router = require('express').Router();
const verifyToken = require('../auth/auth').verifyToken;
const categoriesRouter = require('./forum/category/categoryRoutes');

const logger = require('../util/logger');

// Just for testing!!!
router.get('/', verifyToken(),  (req, res, next) => {
	res.status(200).send(req.body);
})

router.use('/categories', verifyToken(), categoriesRouter);



module.exports = router;

