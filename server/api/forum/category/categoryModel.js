const mysql = require('mysql');
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

exports.getCategories = async (auth_level) => {
	// const {results: [r]} = 
	return queryData('SELECT category_id, title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0', auth_level);
}
