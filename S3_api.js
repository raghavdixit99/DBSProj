var AWS = require('aws-sdk')
const fs = require('fs')

const BUCKET = 'dbsprojimg1'
//const REGION = 'Asia Pacific (Mumbai)'
const ACCESS_KEY = 'AKIAIWPZYE56GDYZPFUQ';
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
  })
  .catch(err => {
    console.log('failed:', err);
  })

  return url;
}

