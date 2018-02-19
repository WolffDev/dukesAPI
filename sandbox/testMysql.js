const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
	socketPath: '/var/run/mysqld/mysqld.sock',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABSASE 
});
async function main() {
	return [rows, fields] = await connection.execute('SELECT text FROM app_posts WHERE user_id = ?', [1]);
}

main()
	.then( res => console.log(res))
	.catch( err => console.log(err))