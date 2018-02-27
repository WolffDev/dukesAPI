const mysql = require('mysql2/promise');

exports.getCategories = async (auth_level) => {
	const connection = await connect();
	return await connection.query({
		sql: 'SELECT title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0',
		timeout: 30000
	}, auth_level)
}


const connect = function() {
	return mysql.createConnection({
			// socketPath: process.env.DB_SOCKET,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});
}