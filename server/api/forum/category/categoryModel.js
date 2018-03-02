const mysql = require('mysql2/promise');

// REBUILD TO AVOID CONNECTION LEAK!

exports.getCategories = async (auth_level) => {
	const connection = await connect();
	// return await connection.query({
	// 	sql: 'SELECT category_id, title FROM app_categories WHERE auth_level <= ? AND soft_delete = 0',
	// 	timeout: 30000
	// }, auth_level)
	return await connection.execute('SELECT `category_id`, `title` FROM `app_categories` WHERE `auth_level` <= ? AND `soft_delete` = 0', auth_level);
}

exports.newCategory = async (category) => {
	const connection = await connect();
	return await connection.query({
		sql: 'INSERT INTO app_categories SET ?',
		timeout: 30000 // 30s
	}, category)
};

const connect = function() {
	return mysql.createPool({
			// socketPath: process.env.DB_SOCKET,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});
}