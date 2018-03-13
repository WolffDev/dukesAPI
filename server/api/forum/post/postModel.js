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

exports.getPostByCategory = (authLevel) => {
	return queryData(`
		SELECT 
			post_id, 
			title,
			body,
			user_name
		FROM 
			app_posts 
		WHERE 
			category_id = ? 
		AND soft_delete = 0
		`, 
		id
	);
}