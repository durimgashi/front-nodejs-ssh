// let mysql = require('mysql');
// let dbconfig = require('./database/database');
let express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();
let port = process.env.port || 3000;
let path = require('path');
let bcrypt = require('bcryptjs');


var mysql = require('mysql');
var dbconfig = require('./database/database');
var connection = mysql.createConnection(dbconfig.connection);


let passport = require('passport');
let flash = require('connect-flash');

require('./passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('views', '../views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('..'))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./index.js')(app, passport, connection, bcrypt);

app.listen(3000);
console.log("Port: " + port);

