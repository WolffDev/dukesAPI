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
	const test = [4];
	// return await connection.execute('SELECT title, body FROM app_posts WHERE soft_delete = 0 AND category_id IN('+test+')');
	return await connection.query({
			sql: 'SELECT title, body FROM app_posts WHERE soft_delete = ? AND category_id IN(?)',
			timeout: 40000 // 40s
		},
		[0, test]
	)
}

async function insert() {
	const connection = await connect();
	const insertData = {
		title: '10; DROP TABLE app_auth /',
		body: 'Body text from node!!!',
		category_id: 4,
		user_id: 1
	};
	// return await connection.execute('SELECT title, body FROM app_posts WHERE soft_delete = 0 AND category_id IN('+test+')');
	return await connection.query({
			sql: 'INSERT INTO app_posts SET ?',
			timeout: 40000 // 40s
		},
		insertData
	)
}

// main()
// 	.then( res =>  console.log(res))
// 	.catch( err => console.log(err))

// console.log(randToken.generate(50));

insert()
	.then( res => console.log(res))
	.catch( err => console.log(err))