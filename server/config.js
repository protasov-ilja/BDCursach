let mysql = require('mysql');
module.exports = {
	name: 'server',
	version: '0.0.1',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8000,
	db: {
		get: mysql.createConnection({
			host     : 'www.db4free.net',
			user     : 'pfltriot',
			password : 'Qweryt123',
			database : 'air_tickets_bd'
		})
	}
};