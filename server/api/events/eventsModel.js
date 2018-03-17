const pool = require('../../config/ddMemberPool');

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

exports.get = (offset) => {
	return queryData(`
		SELECT 
			id,
			event,
			time_from,
			time_to
		FROM 
			event
		WHERE
			time_from
		ORDER BY
			time_from DESC
		LIMIT 
			4
		OFFSET 
			?
		`,
		offset
	)
}