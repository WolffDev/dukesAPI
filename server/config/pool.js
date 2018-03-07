const config = require('./config');
const mysql = require('mysql2');

const pool = mysql.createPool({
	// socketPath: config.db.socket,
	connectionLimit: 5,
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

module.exports = pool;