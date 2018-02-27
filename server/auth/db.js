const config = require('../config/config');

const prodDB = {
	socketPath: config.db.socket,
	user: config.db.user,
	password: config.db.pass,
	database: config.db.database
};

const devDB = {
	host: config.db.host,
	user: config.db.user,
	password: config.db.pass,
	database: config.db.database
};

if(config.env === 'dev') {
	module.exports = devDB;
} else {
	module.exports = prodDB;
}