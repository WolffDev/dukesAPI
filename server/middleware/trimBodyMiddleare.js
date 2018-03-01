module.exports = (req, res, next) => {
	const oldBody = req.body;
	const newBody = {};
	for(let prop in oldBody) {
		newBody[prop] = oldBody[prop].trim();
	}
	req.body = newBody;
	return next();
}