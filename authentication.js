var express = require('express');
var mysql = require('mysql');
var S3 = require('./S3_api');
var multer = require('multer');

var upload = multer({ dest: __dirname + '/images' });

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
    //console.log(req);
    connection.query('select * from USER where userID ='+req.body.email+' and '+'password ='+req.body.password, function (err, result, fields) {
      if(err) console.log(err);
      if(result == null) {
        console.log('unsuccessful');
        res.send("Unsuccessful");
      } else {
        console.log('login successful');
        res.send("Successful");  
      }
    });
}
module.exports.loginmerchant = function (req,res) {
  //fetch merchent details
  connection.query('select * from USER where userID ='+req.body.selleremail+' and '+'password ='+req.body.sellerpassword, function (err, result, fields) {
    if(err) console.log(err);
      if(result == null) {
        console.log('unsuccessful');
        res.send("Unsuccessful");
      } else {
        console.log('login successful');
        res.send("Successful");  
      }
    });
}
module.exports.register = function (req,res){
  var addrstr = req.body.address1+'\n'+req.body.address2+'\n'+req.body.address3;
  console.log(addrstr);
    var user_sample = {
        "uname" : req.body.userid,
        "email" : req.body.email,
        "pass" : req.body.password,
        "first_name" : req.body.first_name,
        "last_name" : req.body.last_name,
        "phone"  : req.body.contactno,
        "address" : addrstr,
        "pincode" : req.body.pincode
      }
      connection.query('insert into USER values(' + '"'+user_sample.uname+'"' + "," + '"'+user_sample.pass+'"' + ')',function (err) { 
        if(err) console.log(err);
        else
        console.log("inserted into USER");
       });
       connection.query('insert into customer values(' + '"'+user_sample.uname+'"' + "," + '"'+user_sample.first_name+'"'+ ',' + '"'+user_sample.last_name+'"' + ')',function (err) { 
        if(err) console.log(err);
        else
        console.log("inserted into customer");
       });
       connection.query('insert into personalinfo values(' + '"'+user_sample.uname+'"' + "," + '"'+user_sample.contactno+'"' + ',' + '"'+user_sample.email+'"' + ',' + '"'+user_sample.address+'"' + ',' + '"'+user_sample.pincode+'"' + ')',function (err) { 
        if(err) console.log(err);
        else
        console.log("inserted into personelInfo");
       });

    //Connection.query to add this obj to db
    res.send("User added");
    console.log("user added");  
}

module.exports.registermerchant = function (req,res) {

}


module.exports.forgotpass = function (req,res){
    console.log("old pass" + user.pass)
    if(user.uname == req.body.email) {
        user.pass = req.body.new_password;
    }
    console.log("changed sucessfully"+user.pass);
    res.send("Password Changed Successfully");
}

module.exports.fetchCategory = function (req,res) {
  console.log('in');
  connection.query('select * from product where categoryID = '+req.body.category, function (err,result,fields){
    
    if(err)  console.log(err);

    else
    res.send(result);
  });
}

module.exports.fetchALL = function (req,res) {
  connection.query('select * from product order by '+req.body.value,function (err,result,fields) {
    if(err) console.log(err);
    else
    res.send(result);
  });
}

module.exports.fetchbyPandC = function (req,res) {

  connection.query('select * from product where categoryID = '+req.body.category+' and unitprice > '+req.body.lower +' and unitprice < '+req.body.upper,function (err,result,fields) {
    if(err) console.log(err);
    else
    res.send(result);
    });
  
}

module.exports.fetchByPriceRange = function (req,res) {

  connection.query('select * from product where unitprice > '+req.body.lower +' and unitprice < '+req.body.upper,function (err,result,fields) {
    if(err) console.log(err);
    else
    res.send(result);
    });  
}

module.exports.fetchAllCategories = function (req,res) {
  connection.query('select distinct(categoryname) from product natural join category',function (err,result,fields) { 
    if(err)  console.log(err);
    else
    res.send(result);
   });
}
module.exports.getCategorybyID = function (req,res) {
  connection.query('select categoryname from category where categoryID='+req.body.catID,function (err,result,fields) { 
    if(err)  console.log(err);
    else
    res.send(result);
   });
}
module.exports.getMerchantbyID = function (req,res) {
  connection.query('select cname from merchant where merID='+'"'+req.body.merID+'"',function (err,result,fields) { 
    if(err)  console.log(err);
    else
    res.send(result);
   });
}
module.exports.getShipper = function (req,res) {
  connection.query('select distinct(companyname) from shippinginfo',function (err,result,fields) { 
    if(err)  console.log(err);
    else
    res.send(result);
   });
}
// module.exports.UploadImage = function (req,res) {

// }

module.exports.Addproduct = function(link,reqbody) {
    connection.query('insert into product values('+reqbody.prodID+','+'"'+reqbody.merID+'"'+','+reqbody.shipperID+','+reqbody.catID+','+'"'+reqbody.prodname+'"'+','+'"'+reqbody.discount+'"'+','+'"'+reqbody.price+'"'+','+reqbody.returnlvl+','+'"'+link+'"'+')',function (err,result,fields) { 
      if(err) console.log(err);
  });
}