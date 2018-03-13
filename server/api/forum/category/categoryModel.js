const pool = require('../../../config/pool');
const logger = require('../../../util/logger');

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

exports.findById = (id, auth_level) => {
	return queryData(`
		SELECT 
			title, auth_level 
		FROM 
			app_categories 
		WHERE 
			category_id = ? 
		AND 
			auth_level <= ? 
		AND
			soft_delete = 0
		LIMIT 1
		`, 
		[id, auth_level]
	)
}

exports.getAll = (authLevel) => {
	return queryData(`
		SELECT 
			category_id, 
			title 
		FROM 
			app_categories 
		WHERE 
			auth_level <= ? 
		AND soft_delete = 0
		`, 
		authLevel
	);
}

exports.save = (user_id, category) => {
	return queryData(`
		INSERT INTO
			app_categories 
		SET ?
		`, 
		Object.assign(category, {'created_by': user_id})
	);
}

exports.update = (category, id, user_id, authLevel) => {
	return queryData(`
		UPDATE 
			app_categories 
		SET 
			?
		WHERE
			category_id = ?
		AND
			soft_delete = 0
		AND
			auth_level <= ?
		`, 
		[Object.assign(category, {'updated_by': user_id}), id, authLevel]
	)
}

exports.remove = (id, user_id, authLevel) => {
	return queryData(`
		UPDATE
			app_categories
		SET
			?
		WHERE
			category_id = ?
		AND
			soft_delete = 0
		AND
			auth_level <= ?
		`, 
		[Object.assign({'soft_delete': 1, 'deleted_by': user_id}), id, authLevel]
	)
}
