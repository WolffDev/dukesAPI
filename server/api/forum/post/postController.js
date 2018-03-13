exports.get = (req, res, next) => {

	res.status(200).send(Object.keys(req.query) == 'category');
}