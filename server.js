const express = require('express');
var bodyParser = require('body-parser')
var authenticate = require('./authentication');

//sample db data for testing:
var user = {
  "uname" : 'raghav99@gmail.com',
  "pass" : 'lauda',
  "first_name" : 'Raghav',
  "last_name" : 'Dixit'
}
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// create the homepage route at '/'
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/"+"index.html");
  })

//login page
app.get('/login', (req,res) => {
    res.sendFile(__dirname+"/"+"login.html");

    // var email = req.body.email;
    // var pass = req.body.password;
    // //function call to fetch user details for future
    // //error handling
   
})

//register page
app.get('/register', (req,res) => {
  res.sendFile(__dirname+"/"+"register.html");

  //function call to insert in DB

})

app.get('/forgotPass',(req,res) => {
  res.sendFile(__dirname + "/" + "forgotpass.html");
})
app.post('/login-auth', authenticate.login);
app.post('/register-auth', authenticate.register);
app.post('/forgot-auth', authenticate.forgotpass);


app.listen(8001);