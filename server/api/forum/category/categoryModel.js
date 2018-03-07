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
		LIMIT 1`, 
		[id, auth_level]
	)
}

exports.getAll = (auth_level) => {
	// const {results: [r]} = 
	return queryData('SELECT category_id, title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0', auth_level);
}

exports.save = (category) => {
	return queryData('INSERT INTO app_categories SET ?', category);
}
