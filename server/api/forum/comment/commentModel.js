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

exports.get = (post_id) => {
	return queryData(`
		SELECT
			comment_id,
			text,
			user_name,
			created,
			post_id,
			user_id
		FROM
			app_comments
		WHERE
			post_id = ?
		AND
			soft_delete = 0
		ORDER BY
			created ASC
		`,
		post_id
	)
}

exports.findById = (comment_id) => {
	return queryData(`
		SELECT
			text,
			user_id,
			created,
			user_name,
			post_id
		FROM
			app_comments
		WHERE
			comment_id = ?
		AND
			soft_delete = 0
		LIMIT 1
		`,
		comment_id
	)
}

exports.save = (data, post_id, user_id) => {
	return queryData(`
		INSERT INTO
			app_comments
		SET
			?
		`,
		Object.assign(data, {user_id, post_id})
	)
}

exports.put = (data, user_id, comment_id) => {
	return queryData(`
		UPDATE
			app_comments
		SET
			?
		WHERE
			comment_id = ?
		AND
			soft_delete = 0
		`,
		[Object.assign(data, {updated_by: user_id}), comment_id]
	)
}

exports.remove = (comment_id, user_id) => {
	return queryData(`
		UPDATE
			app_comments
		SET
			?
		WHERE
			comment_id = ?
		AND
			soft_delete = 0
		`, 
		[{soft_delete: 1, deleted_by: user_id}, comment_id]
	)
}


exports.getCommentAuthor = (comment_id) => {
	return queryData(`
		SELECT
			user_id
		FROM
			app_comments
		WHERE
			comment_id = ?
		`,
		comment_id
	)
}