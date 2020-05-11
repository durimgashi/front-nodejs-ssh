var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var crypto = require('crypto');
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

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, username, password, done) {
            connection.query("SELECT * FROM user WHERE username = ? and password = ?", [username, hash(password, "test")], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length < 1)
                    return done(null, false, req.flash('loginMessage', "No user found"));
                return done(null, rows[0]);
            });
            function hash(password, salt){
                // var hash = crypto.createHmac('sha512', salt);
                let hash = crypto.createHash('sha512');
                hash.update(password);
                let value = hash.digest('hex');
                return value;
            }
        })
    );
};
