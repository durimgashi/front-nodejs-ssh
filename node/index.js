'use strict'

let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
// const Car = require('car');

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

app.set('views', '../views');
app.set('view engine', 'ejs');

app.get('/home', function(request, response) {
	// response.sendFile('/index.ejs',{root: path.join(__dirname, '../views')});
	response.render('index');
});
app.get('/login', function(request, response) {
    // response.sendFile('/login.ejs',{root: path.join(__dirname, '../views')});
	response.render('login');
});
app.get('/register', function(request, response) {
	// response.sendFile('/register.ejs',{root: path.join(__dirname, '../views')});
	response.render('register');
});
app.get('/cars', function(request, response) {
	// response.render('cars');
	connection.query('SELECT * FROM car', function(error, carResults, fields) {
		// jsonCarResult = JSON.parse(JSON.stringify(carResults));
		// response.end();
		response.render('cars',{data:carResults});
	});
});
app.get('/cars/:carId', function(request, response) {
	let carId = request.params.carId;
	// connection.query('SELECT carId, brand, type, fuel, year, price, color, numDoor, description, picturePath FROM car WHERE carId = ?', [carId], function(error, results, fields) {
	connection.query('SELECT * FROM car WHERE carId = ?', [carId], function(error, results, fields) {
		// if (!results.length) {
		// 	response.send('Error loading car!');
		// } else {
		// 	// jsonResult = JSON.parse(JSON.stringify(results));

			response.render('car-view', {car:results});
		// }
		response.end();
	});
});


let jsonResult;

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (!results.length) {
				response.send('Incorrect Username and/or Password!');
			} else {
				jsonResult = JSON.parse(JSON.stringify(results));
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.send('FUCK YOU!');
		response.end();
	}
});

//Sends login data to Java application
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
		, [firstName, lastName, email, username, password, age, city], function(error, results, fields) {
			var obj = {firstName:firstName, lastName:lastName, email:email, username:username,password:password,age:age,city:city};
			jsonResult = JSON.parse(JSON.stringify(obj));
			response.redirect('/register1');

		});
});

app.get('/register1', function(request, response) {
	// if (request.session.loggedin) {
		response.send(jsonResult);
	// } else {
	// 	response.send('Please login to view this page!');
	// }
	response.end();
});

let jsonCarResult;
// app.use('/cars', function(request, response) {
//
// 		connection.query('SELECT * FROM car', function(error, carResults, fields) {
// 			// jsonCarResult = JSON.parse(JSON.stringify(carResults));
// 			// response.end();
// 			response.render('cars',{data:carResults});
// 		});
// });


app.listen(3000);