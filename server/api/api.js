const router = require('express').Router();
const verifyToken = require('../auth/auth').verifyToken;
const categoryRouter = require('./forum/category/categoryRoutes');
const postRouter = require('./forum/post/postRoutes');

const logger = require('../util/logger');

// Just for testing!!!
router.get('/', verifyToken(),  (req, res, next) => {
	res.status(200).send("/ virker");
})

router.use('/category', verifyToken(), categoryRouter);
router.use('/posts', verifyToken(), postRouter);



module.exports = router;

