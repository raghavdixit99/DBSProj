const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var authenticate = require('./authentication');
var S3 = require('./S3_api');
var multer = require('multer');
//var upload = multer({ dest: __dirname + '/images' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg'); //Appending .jpg
  }
})

var upload = multer({ storage: storage });
//sample db data for testing:

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.options('*', cors())

// create the homepage route at '/'
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/testing-pages"+"/index.html");
    
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
});

app.post('/fetchByCategory', authenticate.fetchCategory);
app.post('/fetchALL', authenticate.fetchALL);
app.post('/fetchByPandC', authenticate.fetchbyPandC);
//app.get('/fetch')
//POST functions
app.post('/login-auth-customer', authenticate.login);
app.post('/login-auth-seller', authenticate.loginmerchant);
app.post('/register-auth-customer', authenticate.register);
app.post('/fetchByPriceRange',authenticate.fetchByPriceRange);
app.post('/fetchallcategories',authenticate.fetchAllCategories);
app.post('/getMerchant',authenticate.getMerchantbyID);
app.post('/getCategorybyId',authenticate.getCategorybyID);
app.post('/getShipper',authenticate.getShipper)
app.post('/addProduct',upload.single('image'),async function (req,res) {
  console.log('in');
  if(req.file){
    res.json(req.file);
    console.log(req.file.filename);
    link = (await S3.S3_getURL(req.file.path,req.file.originalname,'dbsprojimg1')).split("?")[0];
    console.log(link);
    authenticate.Addproduct(link,req.body);
  }
  else console.log('error');
});
//app.post('/register-auth-seller'.authenticate.register);
app.post('/forgot-auth', authenticate.forgotpass);

// (async function test(){
//   const localImage = './shoe.jpeg' ;
//   const imageRemoteName = `shoe_${new Date().getTime()}.jpeg` ;
//   var link = await S3.S3_getURL(localImage,imageRemoteName,'dbsprojimg');
// })();

app.listen(8002);