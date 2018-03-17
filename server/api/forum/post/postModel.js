const pool = require('../../../config/ddPool');

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
		ORDER BY
			ap.created ASC
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

// https://dba.stackexchange.com/questions/182789/insert-into-table-where-boolean-value-in-another-table-is-true
	return queryData(`
		INSERT INTO
			app_posts
			( 
				title, 
				body, 
				category_id, 
				user_name, 
				user_id
			) 
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

exports.update = (data, post_id, user_id) => {
	return queryData(`
		UPDATE
			app_posts
		SET
			?
		WHERE
			post_id = ?
		AND
			soft_delete = 0
		`,
		[Object.assign(data, {updated_by: user_id}), post_id]
	)
}

exports.remove = (post_id, user_id) => {
	return queryData(`
		UPDATE
			app_posts
		SET
			?
		WHERE
			post_id = ?
		AND
			soft_delete = 0
		`, 
		[{soft_delete: 1, deleted_by: user_id}, post_id]
	)
}

exports.getAutherFromPost = (post_id) => {
	return queryData(`
		SELECT
			user_id
		FROM
			app_posts
		WHERE
			post_id = ?
		`,
		post_id
	)
}

exports.getAuthLevelFromPost = (post_id) => {
	return queryData(`
		SELECT
			ac.auth_level
		FROM
			app_categories AS ac
		LEFT JOIN
			app_posts as ap
		ON
			ac.category_id = ap.category_id
		WHERE
			ap.post_id = ?
		`,
		post_id
	)
}