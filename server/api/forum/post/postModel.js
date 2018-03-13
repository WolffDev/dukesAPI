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

exports.findById = (postId, authLevel) => {
	return queryData(`
		SELECT
			ap.title,
			ap.body,
			ap.user_name,
			ap.created,
			ac.title
		FROM
			app_posts AS ap
		LEFT JOIN
			app_categories AS ac
		ON
			ap.category_id = ac.category_id
		WHERE
			ap.post_id = ?
		AND
			ap.soft_delete = 0
		AND
			ac.auth_level <= ?
		`, 
		[postId, authLevel]
	)
}

exports.getPostByCategory = (categoryId, authLevel) => {
	return queryData(`
		SELECT
			ap.post_id,
			ap.title,
			ap.body,
			ap.user_name,
			ap.created
		FROM
			app_posts AS ap
		LEFT JOIN
			app_categories AS ac
		ON
			ap.category_id = ac.category_id
		WHERE
			ap.soft_delete = 0
		AND
			ap.category_id = ?
		AND
			ac.auth_level <= ?
		`,
		[categoryId, authLevel]
	);
}

exports.save = (user_id, data, category_id, authLevel) => {
	const newData = Object.assign(data, {user_id})
	const dataArray = Object.values(newData);
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

exports.update = () => {
	
}