var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database/database');
var connection = mysql.createConnection(dbconfig.connection);

//not sure about this
connection.query('USE ' + dbconfig.connection.database);

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.userId);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM user WHERE userId = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         firstNameField: "firstName",
    //         lastNameField: "lastName",
    //         emailField: "email",
    //         usernameField: "username",
    //         passwordField: "password",
    //         ageField: "age",
    //         cityField: "city",
    //         passReqToCallback: true
    //     },
    //     function (req, firstName, lastName, username, email, password, age, city, done) {
    //         let registerQuery = "INSERT INTO user (firstName, lastName, username, email, password, age, city ) VALUES (?, ?, ?, ?, ?, ?, ?)";
    //         connection.query(registerQuery, [firstName, lastName, username, email, password, age, city], function (err, row) {
    //             if (err)
    //                 return done(err);
    //         });
    //
    //     })
    // );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, username, password, done) {
            connection.query("SELECT * FROM user WHERE username = ? and password = ?", [username, password], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length)
                    return done(null, false, req.flash('loginMessage', "No user found"));
                return done(null, rows[0]);
            });
        })
    );
};
