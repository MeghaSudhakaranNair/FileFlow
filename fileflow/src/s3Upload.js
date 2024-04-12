// src/s3Upload.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1', // Replace with your AWS region
});

const s3 = new AWS.S3();
// const dynamoDB = new AWS.DynamoDB();

export const uploadFileToS3 = (file) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: file.name,
    Body: file,
    ContentType: 'text/plain', // Set the content type for .txt files
    ACL: 'private', // Ensure the file is private
  };

  return s3.upload(params).promise();
};

