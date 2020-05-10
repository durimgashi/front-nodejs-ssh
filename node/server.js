const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = process.env.port || 3000;
const path = require('path');

//http
const http = require('http');

const nodemailer = require('nodemailer');
require('dotenv').config();

const mysql = require('mysql');
const dbconfig = require('./database/database');
const connection = mysql.createConnection(dbconfig.connection);

const passport = require('passport');
const flash = require('connect-flash');


const socketio = require('socket.io');
const formatMessage = require('./chatUtils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./chatUtils/users');
const server = http.createServer(app);
const io = socketio(server);

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


require('./index.js')(app, passport, connection, nodemailer);
require('./textChat.js')(io, app, express, path, userJoin, getCurrentUser, userLeave, getRoomUsers, formatMessage());
// require('./public/js/main.js')(io, app, express, path, document,  userJoin, getCurrentUser, userLeave, getRoomUsers);

// app.listen(3000);
server.listen(3000);

console.log("Port: " + port);

// const exec = require('child_process').exec;
// const child = exec('cd chat & node chatServer.js',
//     (error, stdout, stderr) => {
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//         if (error !== null) {
//             console.log(`exec error: ${error}`);
//         }
// });
//
// const childvideo = exec('cd videoChat & node server.js',
//     (error, stdout, stderr) => {
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//         if (error !== null) {
//             console.log(`exec error: ${error}`);
//         }
// });