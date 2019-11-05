var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '35.154.87.215',
  user     : 'monty',
  password : 'some_pass',
  port     : '3306',
  database : 'DBS'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});


module.exports.login = function(req,res) {
    //connection.query function to fetch user details from db
    //error handling
    console.log(req);
    connection.query('select * from USER where userID ='+req.body.email+'and'+'password ='+req.body.password, function (err, result, fields) {
      if(err) throw err;
      if(result == null) console.log('unsuccessful');
      console.log('login successful');
      });
}
module.exports.loginmerchant = function (req,res) {
  //fetch merchent details
}
module.exports.register = function (req,res){
    var user_sample = {
        "uname" : req.body.email,
        "pass" : req.body.password,
        "first_name" : req.body.first_name,
        "last_name" : req.body.last_name
      }
    //Connection.query to add this obj to db
    console.log("user added ");  
}

module.exports.forgotpass = function (req,res){
    console.log("old pass" + user.pass)
    if(user.uname == req.body.email) {
        user.pass = req.body.new_password;
    }
    console.log("changed sucessfully"+user.pass);
}