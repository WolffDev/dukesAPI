require('dotenv').config({path: '../.env'});
let randToken = require('rand-token');
const mysql = require('mysql2/promise');

const connect = function() {
	return mysql.createConnection({
			// socketPath: process.env.DB_SOCKET,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});
}

async function main() {
	const connection = await connect();
	const test = [1,2,3];
	return await connection.execute('SELECT title, body FROM app_posts WHERE soft_delete = 0 AND category_id IN('+test+')');
}

main()
	.then( res =>  console.log(res[0]))
	.catch( err => console.log(err))

console.log(randToken.generate(50));