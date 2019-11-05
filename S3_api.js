var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'dbsprojimg1'
//const REGION = 'Asia Pacific (Mumbai)'
const ACCESS_KEY = 'AKIAIHM5ADAY5WVKOOLQ';
const SECRET_KEY = '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';

const localImage = './shoe.jpeg' ;
const imageRemoteName = `shoe_${new Date().getTime()}.jpeg` ;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
})

var s3 = new AWS.S3()

module.exports.S3_getURL = async function (localImage,imageRemoteName, BUCKET) {
var url;
await s3.putObject({
  Bucket: BUCKET,
  Body: fs.readFileSync(localImage),
  Key: imageRemoteName
})
  .promise()
  .then(response => {
    console.log(`done! - `, response)
     url = s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })
    //console.log(  `The URL is ` + url);
    url = url.split('?')[0];
  })
  .catch(err => {
    console.log('failed:', err);
  })

  return url;
}

