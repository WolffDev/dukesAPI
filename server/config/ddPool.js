const config = require('./config');
const mysql = require('mysql');

const pool = mysql.createPool({
	// socketPath: config.db.socket,
	connectionLimit: 50,
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

module.exports = pool;