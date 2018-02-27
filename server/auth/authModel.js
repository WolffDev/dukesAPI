const mysql = require('mysql2/promise');
// const randToken = require('rand-token');


// module.exports = async function hasRefreshToken(id) {
// 	const connection = await connect();
// 	return await connection.query({
// 		sql: 
// 	})
// }

// exports.generateRefreshToken = async function(id) {
// 	let randomToken = randToken.generate(50);
// 	let data = {
// 		user_id: id,
// 		token: randomToken
// 	};
// 	const connection = await connect();
// 	return await connection.query({
// 		sql: 'INSERT INTO app_refresh_tokens SET ?',
// 		timeout: 30000
// 	}, data)
// }

exports.checkRefreshToken = async (id, refreshToken) => {
	let data = [id, refreshToken];
	const connection = await connect();
	return await connection.query({
		sql: 'SELECT token_id FROM app_refresh_tokens WHERE user_id = ? AND token = ? AND active = 1',
		timeout: 30000
	}, data)
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