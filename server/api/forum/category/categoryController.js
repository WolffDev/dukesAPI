exports.get = (req, res, next) => {
	res.status(200).send(req.body);
}