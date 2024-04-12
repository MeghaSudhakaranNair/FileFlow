# Introduction
  This project is a basic React application that includes a text box, a file input option, and a submit button. It demonstrates the integration of various AWS services, including S3, API Gateway, Lambda, DynamoDB, and EC2.
# How It Works
 ## User Interaction: The user enters text in the text box and selects a file to upload.
 ![Alt text](image.png)

# Submit Action: Upon clicking the submit button, the file is uploaded to an S3 bucket.
![Alt text](<Screenshot 2024-04-12 at 2.36.19 AM.png>)

# Data Storage: Through API Gateway and a Lambda function, the S3 file path and the input text are stored in a DynamoDB table.

Stream Trigger: A new item added to the DynamoDB table triggers another Lambda function through Dynamo Stream.
EC2 Instance Initiation: The triggered Lambda function initiates a VM of an EC2 instance.
Script Execution: When the EC2 instance is loaded, a script runs that retrieves the input text and file path from DynamoDB, appends the text to the file, and saves it in the S3 bucket as output.txt. The file path of output.txt is also saved in DynamoDB.
Configuration
S3 Bucket Name: [Placeholder for S3 Bucket Name]
DynamoDB Table Name: [Placeholder for DynamoDB Table Name]
Lambda Function Names: [Placeholder for Lambda Function Names]
EC2 Instance ID: [Placeholder for EC2 Instance ID]
Tools Used
React
AWS S3
AWS API Gateway
AWS Lambda
AWS DynamoDB
AWS EC2


Live video
Installation and Setup
[Instructions for setting up the project]
Usage
[Instructions on how to use the application]
