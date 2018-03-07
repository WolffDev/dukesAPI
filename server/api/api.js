const router = require('express').Router();
const verifyToken = require('../auth/auth').verifyToken;
const categoryRouter = require('./forum/category/categoryRoutes');

const logger = require('../util/logger');

// Just for testing!!!
router.get('/', verifyToken(),  (req, res, next) => {
	res.status(200).send("/ virker");
})

router.use('/category', verifyToken(), categoryRouter);



module.exports = router;

