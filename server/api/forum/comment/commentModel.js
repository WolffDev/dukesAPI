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
			post_id
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