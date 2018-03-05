const config = require('./config');
const mysql = require('mysql');

module.exports = mysql.createPool({
		// socketPath: config.db.socket,
		connectionLimit: 5,
		host: config.db.host,
		user: config.db.user,
		password: config.db.password,
		database: config.db.database
	});