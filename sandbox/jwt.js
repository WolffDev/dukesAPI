require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZHVrZXNkZW5tYXJrLmRrIiwiaWF0IjoxNTE5Njc0NTAzLCJuYmYiOjE1MTk2NzQ1MDMsImV4cCI6MTUxOTY3NDgwMywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMzkiLCJyb2xlcyI6WyJzdWJzY3JpYmVyIl0sImF1dGhfbGV2ZWwiOiIwIn19fQ.cCZhaabr21HGDeTz0yUttct_YddJaIVYTmyKLAQfZJI';

let token2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZHVrZXNkZW5tYXJrLmRrIiwiaWF0IjoxNTE5Njc1NTYwLCJuYmYiOjE1MTk2NzU1NjAsImV4cCI6MTUxOTY3NTg2MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMzkiLCJyb2xlcyI6WyJzdWJzY3JpYmVyIl0sImF1dGhfbGV2ZWwiOiIwIn19fQ.Sszjsz3heocHHXIFqRKJA_1kGkURBsidHy119ozVz_4';


let newToken = jwt.sign({
	iss: 'https://dukesdenmark.dk',
	iat: Math.floor(Date.now() / 1000),
	nbf: Math.floor(Date.now() / 1000),
	exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRE),
	data: 'data'
}, process.env.JWT, (err, token) => {
	if(err) return console.log(err);
	console.log(token);
});

jwt.verify(token2, process.env.JWT, {issuer: 'https://dukesdenmark.dk'}, (err, decoded) => {
	if(err) return console.log(err.name);
	console.log(decoded);
})



// console.log(JSON.stringify(newToken, null, 2));