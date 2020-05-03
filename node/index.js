'use strict'

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'rentcars'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/login.html', function(request, response) {
    response.sendFile('/login.html',{root: path.join(__dirname, '../ui')});
});
app.get('/register.html', function(request, response) {
	response.sendFile('/register.html',{root: path.join(__dirname, '../ui')});
});
app.get('/index.html', function(request, response) {
	response.sendFile('/index.html',{root: path.join(__dirname, '../ui')});
});


app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var jsonResult;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {


				jsonResult = JSON.stringify(results);

				request.session.jsonRes = jsonResult;

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


app.post('/register1', function(request, response) {
	var firstName = request.body.firstName;
	var lastName = request.body.firstName;
	var email = request.body.email;
	var username = request.body.username;
	var password = request.body.password;
	var age = request.body.age;
	var city = request.body.city;
    connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
		, [firstName, lastName, email, username, password, age, city])
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send(request.session.jsonRes);

		// response.status(200).json({
		// 	"firstName" : request.session.firstName,
		// 	"lastName" : request.session.lastName,
		// 	"email" : request.session.email,
		// 	"username" : request.session.username,
		// 	"password" : request.session.password,
		// 	"age" : request.session.age,
		// 	"city" : request.session.city
		// })

	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(3000);