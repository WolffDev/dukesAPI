const pool = require('../../../config/pool');

function queryData(q, data = []) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if(err){
				connection.release();
				reject(err);
			}
			connection.query(q, data, (err, results, fields) => {
				connection.release();
				if(err) reject(err);
				resolve(results);
			})
		})
	})
}

exports.getPostByCategory = (categoryId, authLevel) => {
	return queryData(`
		SELECT
			app_posts.post_id,
			app_posts.title,
			app_posts.body,
			app_posts.user_name,
			app_posts.created
		FROM
			app_posts
		LEFT JOIN
			app_categories
		ON
			app_posts.category_id = app_categories.category_id
		WHERE
			app_posts.soft_delete = 0
		AND
			app_posts.category_id = ?
		AND
			app_categories.auth_level <= ?
		`,
		[categoryId, authLevel]
	);
}

exports.save = (data, category_id, authLevel) => {
	const dataArray = Object.values(data);
	const newDataArray = [];
	dataArray.map( data => {
		newDataArray.push(`'${data}'`)
	});

	return queryData(`
		INSERT INTO 
			app_posts(title, body, category_id, user_name, user_id) 
		SELECT ${newDataArray.toString()}
		FROM
			app_categories AS ac
		WHERE 
			ac.category_id = ?
		AND 
			ac.auth_level <= ?
		`,
		[category_id, authLevel]
	)
}