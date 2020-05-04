'use strict'

let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');

let connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'rentcars'
});

let app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('..'))

app.get('/login.html', function(request, response) {
    response.sendFile('/login.html',{root: path.join(__dirname, '../ui')});
});
app.get('/register.html', function(request, response) {
	response.sendFile('/register.html',{root: path.join(__dirname, '../ui')});
});
app.get('/index.html', function(request, response) {
	response.sendFile('/index.html',{root: path.join(__dirname, '../ui')});
});

let jsonResult;

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				jsonResult = JSON.parse(JSON.stringify(results));
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	// if (request.session.loggedin) {
		response.send(jsonResult);
	// } else {
	// 	response.send('Please login to view this page!');
	// }
	response.end();
});

app.post('/register1', function(request, response) {
	let firstName = request.body.firstName;
	let lastName = request.body.lastName;
	let email = request.body.email;
	let username = request.body.username;
	let password = request.body.password;
	let age = request.body.age;
	let city = request.body.city;
    connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
		, [firstName, lastName, email, username, password, age, city])
});

app.listen(3000);