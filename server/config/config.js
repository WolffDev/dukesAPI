const config = {
	"port": process.env.PORT || 3000,
	"secret": {
    jwt: process.env.JWT || 'gumball'
	},
	"logging": process.env.NODE_ENV == 'dev' ? true : false
};

module.exports = config;