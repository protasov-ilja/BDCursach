let mysql = require('mysql');
//database : 'heroku_785b375f435f04a'
module.exports = {
	name: 'server',
	version: '0.0.1',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8000,
	db: {
		get: mysql.createConnection({
			host     : 'us-cdbr-iron-east-01.cleardb.net',
			user     : 'ba23f8cc28a252',
			password : '0d9d8afa',
			database : 'heroku_c345378e95da7e8'
		})
	}
};