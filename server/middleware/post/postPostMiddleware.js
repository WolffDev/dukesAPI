const { getAuthCategories } = require('../../api/forum/category/categoryModel');

module.exports = (req, res, next) => {
	getAuthCategories(req.auth_level)
		.then(result => {
			let categories = [];
			let categoryId = req.body.category_id;
			result.map( x => categories.push(x.category_id))
			if(!categories.includes(+categoryId)) {
				return next({
					type: 'error',
					name: 'InvalidCategoryIdAuthLevelCreatePost',
					message: 'You are trying to create a post with a category you are not allowed to create the post with'
				})
			}
			return next();
		})
		.catch(err => console.log(err))
}