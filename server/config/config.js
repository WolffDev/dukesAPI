let config = {
	"dev": "development",
	"port": process.env.PORT || 3000,
	"secret": {
    jwt: process.env.JWT || 'gumball'
	},
	"logging": process.env.NODE_ENV == 'dev' ? true : false
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

module.exports = config;