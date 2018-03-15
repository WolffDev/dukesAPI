const { getAuthCategories } = require('../../api/forum/category/categoryModel');
const { getAutherFromPost } = require('../../api/forum/post/postModel');

module.exports = (req, res, next) => {
	getAuthCategories(req.auth_level)
		.then( result => {
			let categories = [];
			let categoryId = req.body.category_id;
			result.map( x => categories.push(x.category_id))
			if(!categories.includes(+categoryId)) {
				return next({
					type: 'error',
					name: 'InvalidCategoryIdAuthLevel',
					message: 'You are trying to update a post with a category you are not allowed to update the post with'
				})
			} else {
				if(req.auth_level >= 3) return next();

				getAutherFromPost(req.params.id)
				.then( result => {
					if(result[0].user_id === +req.user_id) return next();
					next({
						type: 'error',
						name: 'InvalidAuthorId',
						message: 'You are not the author of this post'
					})
				})
				.catch( err => next(err))
			}
		})
		.catch( err => next(err))
}