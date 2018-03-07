const mysql = require('mysql2');
const pool = require('../../../config/pool');
const logger = require('../../../util/logger');
// const mysql = require('mysql2/promise');

// function conn() {
// 	return new Promise( (resolve, reject) => {
// 		pool.getConnection( (err, connection) => {
// 			if(err) {
// 				reject(err)
// 			} else {
// 				resolve(connection)
// 			}
// 		});
// 	});
// }

// function queryData(q, data = []) {
// 	return new Promise( (resolve, reject) => {
// 		conn()
// 			.then( connection => {
// 				connection.query(q, data, (err, results, fields) => {
// 					connection.release()
// 					if(err) {
// 						reject(err)
// 					} else {
// 						resolve(results)
// 					}
// 				});
// 			})
// 			.catch( err => logger.log(err));
// 	})
// }

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

// function queryData(q, data = []) {
// 	pool.getConnection( (err, connection) => {
// 		if(err) throw err;
// 		connection.query(q, data, (err, results, fields) => {
// 			if(err) throw err;
// 			connection.release();
// 			return results;
// 		})
// 	})
// }

exports.getCategories = async (auth_level) => {
	// const {results: [r]} = 
	return queryData('SELECT category_id, title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0', auth_level);
}



// REBUILD TO AVOID CONNECTION LEAK!

// exports.getCategories = async (auth_level) => {
// 	const connection = await connect();
// 	return await connection.query({
// 		sql: 'SELECT category_id, title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0',
// 		timeout: 30000
// 	}, auth_level)
// }

// exports.newCategory = async (category) => {
// 	const connection = await connect();
// 	return await connection.query({
// 		sql: 'INSERT INTO app_categories SET ?',
// 		timeout: 30000 // 30s
// 	}, category)
// };

// const connect = function() {
// 	return mysql.createPool({
// 			// socketPath: process.env.DB_SOCKET,
// 			host: process.env.DB_HOST,
// 			user: process.env.DB_USER,
// 			password: process.env.DB_PASSWORD,
// 			database: process.env.DB_DATABASE
// 		});
// }





