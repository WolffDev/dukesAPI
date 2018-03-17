const pool = require('../config/ddPool');

exports.checkRefreshToken = (id, refreshToken) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if(err){
				connection.release();
				reject(err);
			}
			const sql = 'SELECT token_id FROM app_refresh_tokens WHERE user_id = ? AND token = ? AND active = 1';
			const data = [id, refreshToken];
			connection.query(sql, data, (err, results, fields) => {
				connection.release();
				if(err) reject(err);
				resolve(results);
			})
		})
	})
}