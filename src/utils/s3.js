const AWS = require('aws-sdk');
const { S3 } = require("@aws-sdk/client-s3");

//const env = dotenv.config()
const env = require('dotenv').config();


// Configure the AWS SDK
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    //sessionToken: process.env.AWS_SESSION_TOKEN,
   // region: process.env.AWS_REGION
    region: "eu-north-1"
});

// Create an S3 service object
const s3 = new S3({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",

  },

  //sessionToken: process.env.AWS_SESSION_TOKEN,
  //region: process.env.AWS_REGION
  region: "eu-north-1"
});
console.log("s3")
console.log(s3);

//module.exports = s3






