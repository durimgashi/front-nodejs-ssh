var mysql = require('mysql');
const crypto = require('crypto');

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'rentcars'
});

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length);
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password
 * @param {string} salt
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userpassword, salt);
    return {
      password:passwordData.passwordHash,
      salt:passwordData.salt
    };
}

function compareHashPass(password,saltedpass, salt){
    var test = sha512(password, salt);
    if(test.passwordHash == saltedpass)
    return true;
    else return false;
}

function verify(firstName,lastName,email,username,password,age,city){
    if(validateEmail(email)){
        connection.query('SELECT * FROM user WHERE username = ?', [username], function(error, results, fields) {
        if (!results.length){
            let SP = saltHashPassword(password);
            password = SP.password;
            let salt = SP.salt;   
            connection.query('INSERT INTO user (firstName, lastName, username, email, password, age, city, salt ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, username, email, password, age, city, salt], function(error, results, fields) 
        { console.log('Registered');})}
        else 
            console.log('This username is taken');});}
    else
        console.log("Your email is wrong");
}

function logInUser(username, password){
    if (username && password) {
        connection.query('SELECT password, salt FROM user WHERE username = ?', [username], function(error, results, fields) {
            if (results.length > 0) {
                var p = results[0].password;
                var s = results[0].salt;
                if (compareHashPass(password, p, s))
                {
                    console.log('OK');
                }
                else
                    console.log('Not OK');
            } else {
                console.log('Not OK');
            }
        });
    } else {
        console.log('Not OK');
    }
}
function changePassword(password,username){
  connection.connect(function(err) {
      if (err) throw err;
      let SH = saltHashPassword(password);
      let salt = SH.salt;
      password = SH.password;
      connection.query("UPDATE user SET password = ?, salt =? WHERE username = ?", [password, salt, username], function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
  });}