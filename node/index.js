const crypto = require('crypto');
module.exports = function(app, passport, connection, bcrypt){
	app.get('/', function (request, response) {
		response.render('index.ejs', { user: request.user });
	});


	app.get('/cars', isLoggedIn, function(request, response) {
		connection.query('SELECT * FROM car', function(error, carResults, fields) {
			response.render('cars', {data:carResults, user: request.user});
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

	app.get('/logout', function (request, response) {
		request.logout();
		response.redirect('/');
	})

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

	app.post('/register', function(request, response) {
		let firstName = request.body.firstName;
		let lastName = request.body.lastName;
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
		// let password = bcrypt.hashSync(request.body.password, null, null);
		let age = request.body.age;
		let city = request.body.city;
		connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
			, [firstName, lastName, username, email, hash(password, "test"), age, city], function(error, results, fields) {
				if (error)
					console.log("FUCKING ERROR:: " +  error);
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
	// response.redirect('/');
	response.render('ikatje');
}

function logd(request, response, next) {
	if (request.isAuthenticated()){
		return next();
	}
	return true
}

function hash(password, salt){
	// var hash = crypto.createHmac('sha512', salt);
	var hash = crypto.createHash('sha512');
	hash.update(password);
	var value = hash.digest('hex');
	return value;
}
//
// function validateEmail(email) {
// 	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(String(email).toLowerCase());
// }