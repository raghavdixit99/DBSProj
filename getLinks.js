var S3 = require('./S3_api');
const fs = require('fs');
const path = require('path');
var link;
var ImageDB = {};
dirPath = path.join('/Users','Raghav','Downloads','jpgimages');
console.log(dirPath);

// var test = path.join(dirPath,"blue.jpg");
// console.log(test);
// ImageDB[dirPath] = dirPath;
fs.readdir(dirPath, async function (err, files){
    if(err){
        return console.log("Error scanning..." + err);
    }
    for (var j=1; j<files.length; j++){
        console.log(files[j]);
        var localimage = path.join(dirPath,files[j]);
        var remoteImage = files[j];
        //gets S3 Link
        link = await S3.S3_getURL(localimage,remoteImage,'dbsprojimg');
        console.log(link);
        //store in JSON
        ImageDB[files[j]] = link;
    }    
    console.log(JSON.stringify(ImageDB));
});

//checking JSON object


