module.exports = function(app, passport, connection){
	app.get('/', function (request, response) {
		response.render('index.ejs');
	});

	// app.get('/register', function(request, response) {
	// response.render('register');
	// });
	app.get('/cars', function(request, response) {
		connection.query('SELECT * FROM car', function(error, carResults, fields) {
			response.render('cars', {data:carResults});
			// response.redirect('/cars')
			let json = JSON.parse(JSON.stringify(carResults));
				// request.send(json);

		});
	});

	app.get('/carsjava', function(request, response) {
		connection.query('SELECT * FROM car', function(error, carResults, fields) {
			let json = JSON.parse(JSON.stringify(carResults));
			response.send(json);
		});
	});

	app.use('/cars/:carId', function(request, response) {
		let carId = request.params.carId;
		connection.query('SELECT * FROM car WHERE carId = ?', [carId], function(error, results, fields) {
			response.render('car-view', {car:results});
			response.end();
		});
	});

	app.get('/login', function (request, response) {
		response.render('login', { message : request.flash('loginMessage'), test : "test"});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/cars',
		failureRedirect: '/login',
		session: true,
		failureFlash: true
		}), function (request, response) {
			request.session.user = request.user.username;
			if (request.body.remember){
				request.session.cookie.maxAge = 1000 * 6 * 3;
			}else{
				request.session.cookie.maxAge = false;
			}
			response.redirect('/');
	});

	app.get('/register', function (request, response) {
		response.render('register', { message : request.flash('signupMessage') , test: "test"});
	});

	// app.post('/register', passport.authenticate('local-signup', {
	// 	successRedirect: '/login',
	// 	failureRedirec: '/register',
	// 	failureFlash: true
	// }));
	app.post('/register', function(request, response) {
		let firstName = request.body.firstName;
		let lastName = request.body.lastName;
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
		let age = request.body.age;
		let city = request.body.city;
		connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
			, [firstName, lastName, email, username, password, age, city], function(error, results, fields) {
				// var obj = {firstName:firstName, lastName:lastName, email:email, username:username,password:password,age:age,city:city};
				// var jsonResult = JSON.parse(JSON.stringify(obj));
				// response.send(jsonResult);
				response.redirect('/login');
			});
	});

	app.get('/logout', function (request, response) {
		request.logout();
		response.redirect('/');
	});

}

function isLoggedIn(request, response, next) {
	if (request.isAuthenticated()){
		return next();
	}
	response.redirect('/');
}

// 'use strict'
//
// let mysql = require('mysql');
// let dbconfig = require('./database/database');
// let express = require('express');
// let session = require('express-session');
// let bodyParser = require('body-parser');
// let path = require('path');
// //
// // let connection = mysql.createConnection({
// // 	host     : 'localhost',
// // 	user     : 'root',
// // 	password : '',
// // 	database : 'rentcars'
// // });
//
// let connection = mysql.createConnection(dbconfig.connection);
//
// let app = express();
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
// app.use(express.static('..'))
//
// app.set('views', '../views');
// app.set('view engine', 'ejs');

// app.get('/home', function(request, response) {
// 	response.render('index');
// });

// app.get('/register', function(request, response) {
// 	response.render('register');
// });
// app.get('/cars', function(request, response) {
// 	connection.query('SELECT * FROM car', function(error, carResults, fields) {
// 		response.render('cars', {data:carResults});
// 	});
// });
// app.use('/cars/:carId', function(request, response) {
// 	let carId = request.params.carId;
// 	connection.query('SELECT * FROM car WHERE carId = ?', [carId], function(error, results, fields) {
// 		response.render('car-view', {car:results});
// 		response.end();
// 	});
// });

// let jsonResult;

// app.post('/auth', function(request, response) {
// 	let username = request.body.username;
// 	let password = request.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (!results.length) {
// 				response.send('Incorrect Username and/or Password!');
// 			} else {
// 				jsonResult = JSON.parse(JSON.stringify(results));
// 				request.session.loggedin = true;
// 				request.session.userId = results[0].userId;
// 				response.redirect('/home', {data : request.session.loggedin});
// 			}
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.send('FUCK YOU!');
// 		response.end();
// 	}
// });

//Sends login data to Java application
// app.get('/home', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send(jsonResult);
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

// app.post('/register1', function(request, response) {
// 	let firstName = request.body.firstName;
// 	let lastName = request.body.lastName;
// 	let email = request.body.email;
// 	let username = request.body.username;
// 	let password = request.body.password;
// 	let age = request.body.age;
// 	let city = request.body.city;
//     connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
// 		, [firstName, lastName, email, username, password, age, city], function(error, results, fields) {
// 			var obj = {firstName:firstName, lastName:lastName, email:email, username:username,password:password,age:age,city:city};
// 			jsonResult = JSON.parse(JSON.stringify(obj));
// 			// response.redirect('/register1');
// 			response.send(jsonResult);
// 		});
// });

// app.listen(3000);