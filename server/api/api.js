const router = require('express').Router();
const verifyToken = require('../auth/auth').verifyToken;
const categoryRouter = require('./forum/category/categoryRoutes');
const postRouter = require('./forum/post/postRoutes');
const commentRouter = require('./forum/comment/commentRoutes');
const eventsRouter = require('./events/eventsRoutes');
const newsRouter = require('./news/newsRoutes')

const logger = require('../util/logger');

// Just for testing!!!
router.get('/', verifyToken(),  (req, res, next) => {
	res.status(200).send("/ virker");
})

router.get('/refresh-token', verifyToken(), (req, res, next) => {
	res.status(200).send({token: req.newToken});
})

router.use('/category', verifyToken(), categoryRouter);
router.use('/posts', verifyToken(), postRouter);
router.use('/comment', verifyToken(), commentRouter);
router.use('/events', verifyToken(), eventsRouter);
router.use('/news', verifyToken(), newsRouter);

module.exports = router;

