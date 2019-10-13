var express = require('express');
var sql = require('mysql');

//sample user object:
var user = {
    "uname" : 'raghav99@gmail.com',
    "pass" : 'lauda',
    "first_name" : 'Raghav',
    "last_name" : 'Dixit'
  }

module.exports.login = function(req,res) {
    //connection.query function to fetch user details from db
    //error handling
    if (req.body.email == user.uname & req.body.password == user.pass){
        console.log("Login sucessfull");
      }
      else {
        console.log("Invalid credentials");
      }
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
    
}