const config = {
	"port": process.env.PORT || 3000,
	"secret": {
    	jwt: process.env.JWT
	},
	"logging": process.env.NODE_ENV == 'development' ? true : false,
	"env": process.env.NODE_ENV,
	"db": {
		memberDatabase: process.env.DB_MEMBER_DATABASE,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		socket: process.env.DB_SOCKET
	}
};

module.exports = config;