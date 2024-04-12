import boto3
import sys

region_name = 'us-west-1'
# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name=region_name)

# Get the DynamoDB table
table = dynamodb.Table('fileflow')
response = table.get_item(Key={'id': sys.argv[1]})
# print(response['Item'])
item = response['Item']

if item:
    # Extract necessary information from the item
    file_link = item.get('fileLink')
    file_name = file_link.split('/')[-1]  # Extracting the file name from the URL

    # Download the file from S3
    s3_client = boto3.client('s3')
    local_file_path = f"/tmp/{file_name}"
    s3_client.download_file('fileflow-s3', file_name, local_file_path)

    # Read the input text
    input_text = item.get('textInput')

    with open(local_file_path, 'r') as file:
        file_content = file.read()

    # Append the input text to the file content
    new_file_content = f"{file_content}: {input_text}"   
    # Save the modified content to a new file
    output_file_name = f"{file_name.split('.')[0]}-output.txt"
    output_file_path = f"/tmp/{output_file_name}"
    with open(output_file_path, 'w') as file:
        file.write(new_file_content)
    # Upload the modified file to S3
    s3_client.upload_file(output_file_path, 'fileflow-s3', output_file_name)

    # Construct the S3 path
    s3_path = f"fileflow-s3/{output_file_name}"

    # Update the item in DynamoDB with the output file path
    table.update_item(
        Key={'id': sys.argv[1]},
        UpdateExpression="set outputFilePath = :path",
        ExpressionAttributeValues={':path': s3_path}
    )

    print(f"Output file uploaded to S3: {s3_path}")
else:
    print("Item not found in the table.")



# import boto3

# region_name = 'us-west-1'
# # Initialize the DynamoDB client
# dynamodb = boto3.resource('dynamodb', region_name=region_name)

# # Get the DynamoDB table
# table = dynamodb.Table('fileflow')
# response = table.get_item(Key={'id': '1712878327922049224'})
# # print(response['Item'])
# item = response['Item']

# if item:
#     # Extract necessary information from the item
#     file_link = item.get('fileLink')
#     file_name = file_link.split('/')[-1]  # Extracting the file name from the URL

#     # Download the file from S3
#     s3_client = boto3.client('s3')
#     local_file_path = f"/tmp/{file_name}"
#     s3_client.download_file('fileflow-s3', file_name, local_file_path)

#     # Read the input text
#     input_text = item.get('textInput')

#     with open(local_file_path, 'r') as file:
#         file_content = file.read()

#     # Append the input text to the file content
#     new_file_content = f"{file_content}: {input_text}"   
#     # Save the modified content to a new file
#     output_file_name = f"{file_name.split('.')[0]}-output.txt"
#     output_file_path = f"/tmp/{output_file_name}"
#     with open(output_file_path, 'w') as file:
#         file.write(new_file_content)
#     # Upload the modified file to S3
#     s3_client.upload_file(output_file_path, 'fileflow-s3', output_file_name)

#     # Construct the S3 path
#     s3_path = f"fileflow-s3/{output_file_name}"

#     # Update the item in DynamoDB with the output file path
#     table.update_item(
#         Key={'id': '1712878327922049224'},
#         UpdateExpression="set outputFilePath = :path",
#         ExpressionAttributeValues={':path': s3_path}
#     )

#     print(f"Output file uploaded to S3: {s3_path}")
# else:
#     print("Item not found in the table.")
