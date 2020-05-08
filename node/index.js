const crypto = require('crypto');
module.exports = function(app, passport, connection, nodemailer){
	app.get('/', function (request, response) {
		response.render('index.ejs', { user: request.user });
	});

	app.get('/cars', isLoggedIn, function(request, response) {
		connection.query('SELECT * FROM car', function(error, carResults, fields) {
			response.render('cars', {data:carResults, user: request.user});
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
			response.render('car-view', {car:results, user: request.user});
		});
	});

	app.post('/rent', function(request, response) {
		let carId = request.body.dumbassCarId;
		let rentDate = request.body.rentDate;
		let returnDate = request.body.returnDate;
		let pickupLocation = request.body.pickupLocation;
		let rentD = new Date(rentDate);
		let returnD = new Date(returnDate);
		let numDays = (returnD - rentD) / (24 * 3600 * 1000);

		connection.query('SELECT * FROM car WHERE carId = ? ;', [carId], function(error, carRes, fields) {
			connection.query('INSERT INTO rent (userId, carId, date, returnDate, inCountry, pickupLocation, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?);'
				, [request.user.userId, carRes[0].carId, rentDate, returnDate, true, pickupLocation, numDays*carRes[0].price], function(error, results, fields) {
				console.log("EMAILLLLLLL: " +  request.user.email);
				if (!error)
					transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: process.env.EMAIL || 'noreply.fedauto@gmail.com', // TODO: your gmail account
							pass: process.env.PASSWORD || 'Rentcar123' // TODO: your gmail password
						}
					});

					let mailOptions = {
						from: 'noreply.fedauto@gmail.com',
						to: request.user.email,
						subject: 'Rent - FEDAuto',
						text: 'Congratulations you just got a car.'
					};

					transporter.sendMail(mailOptions, (err, data) => {
						if (err) {
							console.log('Error occurs', err);
						}
						console.log('Email sent!!!');
					});
					response.redirect('/thankyou');
				});
		});
	});

	app.get('/rentjava', function (request, response) {
		connection.query('SELECT * FROM rent ;', function(error, rentResult, fields) {
			let jsonRent = JSON.parse(JSON.stringify(rentResult));
			response.send(jsonRent);
		});
	});

	app.get('/thankyou', function (request, response) {
		response.render('thankyou', { user: request.user });
	});

	app.get('/login', function (request, response) {
		response.render('login', { message : request.flash('loginMessage'), test : "test"});
	});

	app.get('/logout', function (request, response) {
		request.logout();
		response.redirect('/');
	})
	var loginJsonResult;
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/cars',
		failureRedirect: '/login',
		session: true,
		failureFlash: true
		}), function (request, response) {
			request.session.user = request.user.username;
			// loginJsonResult = [{
			// 	userId: request.user.userId,
			// 	firstName: request.user.firstName,
			// 	lastName: request.user.lastName
			// }];
			console.log(request.user.userId);
			console.log(request.user.firstName);
			//console.log(loginJsonResult);
			if (request.body.remember){
				request.session.cookie.maxAge = 1000 * 6 * 3;
				
			}
			else{
					request.session.cookie.maxAge = false;
			}
			response.redirect('/');

			console.log(request.user.userId);
	
		
	});

	app.get('/loginJava', function(request, response){
		
		//response.send(JSON.parse(JSON.stringify(loginJsonResult)));
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
		let age = request.body.age;
		let city = request.body.city;
		connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)'
			, [firstName, lastName, username, email, hash(password, "test"), age, city], function(error, results, fields) {
				if (error)
					console.log("FUCKING ERROR:: " +  error);
				else 
				{
					var obj = {firstName:firstName, lastName:lastName, email:email, username:username,age:age,city:city};
					jsonResult = JSON.parse(JSON.stringify(obj));
					response.redirect('/login');
					
				}
				

			});
	
		app.get('/registerJava', function(request, response) {
				// if (request.session.loggedin) {
					response.send(jsonResult);
				// } else {
				// 	response.send('Please login to view this page!');
				// }
				response.end();
		});

		


	});

	app.get('/logout', function (request, response) {
		request.logout();
		response.redirect('/');
	});

	let recoveryEmail;
	app.use('/reset', function (request, response) {
		response.render('reset.ejs', { user: request.user });
		recoveryEmail = request.body.forgotEmail;
		console.log(recoveryEmail);
		console.log("test text");

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL || 'noreply.fedauto@gmail.com', // TODO: your gmail account
				pass: process.env.PASSWORD || 'Rentcar123' // TODO: your gmail password
			}
		});

		function between(min, max) {
			return Math.floor(
				Math.random() * (max - min) + min
			)
		}
		randomCode = between(100000, 999999);
		console.log(randomCode);

		let mailOptions = {
			from: 'noreply.fedauto@gmail.com', // TODO: email sender
			to: recoveryEmail, // TODO: email receiver
			subject: 'Password Recovery - FEDAuto',
			text: 'Your password recovery code is: ' + randomCode
		};

		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log('Error occurs', err);
			}
			console.log('Email sent!!!');
			response.redirect('/');
		});

	});

	app.post('/code', function(request, response) {
		let recoveryCode = request.body.code;
		let newPassword = request.body.newPassword;
		let confirmPassword = request.body.confirmNewPassword;
		console.log("Confirm password: " + confirmPassword);
		console.log("New password: " + newPassword);
		console.log("Email: " + recoveryEmail);
		if(recoveryCode == randomCode) {
			console.log("Kodi eshte i njejte");
			if (newPassword == confirmPassword){
				changePassword(newPassword, recoveryEmail, connection);
				response.redirect('/login');
			}else{
				console.log("Passwords do not match");
			}
		}else{
			console.log("Kodi nuk eshte i njejte");
		}
	});
}

function isLoggedIn(request, response, next) {
	if (request.isAuthenticated()){
		return next();
	}
	response.render('ikatje');
}

function hash(password, salt){
	var hash = crypto.createHash('sha512');
	hash.update(password);
	var value = hash.digest('hex');
	return value;
}

function changePassword(password, email, connection){
	connection.connect(function(err) {
		if (err) throw err;
		connection.query("UPDATE user SET password = ? WHERE email = ?", [hash(password, "10"), email], function (err, result) {
			if (err) throw err;
			console.log(result.affectedRows + " record(s) updated");
		});
	});
}

// function validateEmail(email) {
// 	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(String(email).toLowerCase());
// }