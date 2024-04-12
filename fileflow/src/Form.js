// import statements
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { uploadFileToS3 } from './s3Upload'; // Import the upload function


// returns JSX, which describes what the UI should look like

function Form() {
  const [fileError, setFileError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const textInput = event.target.elements['text-input'].value;
    const fileInput = event.target.elements['file-input'].files[0];
    let fileLink = null; 
    // Check if the text input is a string
    if (typeof textInput !== 'string') {
      console.log('Text input is not a string.');
      return;
    }

    // Check if the file input has a .txt extension
    if (fileInput && !fileInput.name.endsWith('.txt')) {
      console.log('File is not a .txt file.');
      setFileError(true);
      return;
    }

    setFileError(false);
    console.log('Form submitted with valid inputs.');
    // Handle form submission logic here
    try {
        // Upload file to S3
        if (fileInput) {
          fileLink = await uploadFileToS3(fileInput);
          console.log('File uploaded successfully:', fileLink);
          
        }
        console.log(fileLink.Location)
        // Additional logic to handle text input and other form data
  
        console.log('Form submitted with valid inputs.');
        const apiResponse = await fetch('https://hyw5q4tgw2.execute-api.us-west-1.amazonaws.com/fileflowApi', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            textInput: textInput,
            fileLink: fileLink.Location
          })
        });
  
        if (apiResponse.ok) {
          console.log('Data stored successfully in DynamoDB');
        } else {
          console.error('Error storing data in DynamoDB');
        }
      } catch (error) {
        console.error('File upload error:', error);
      }
  };


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">Upload Form</Typography>

      <Typography variant="subtitle1">Text Input</Typography>
      <TextField
        required
        id="outlined-required"
        defaultValue=""
        name="text-input"
      />

      <Typography variant="subtitle1">File Input</Typography>
      <TextField
        required
        type="file"
        id="outlined-required-file"
        name="file-input"  // Make sure this matches the name used in handleSubmit
        error={fileError}
        helperText={fileError ? "Only .txt files are allowed." : ""}
      />
      <Button variant="contained" type="submit" sx={{ m: 1 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Form;

// secret access key - r8Z+F1f+U8EtEIU21JGjhV6HfdGnJ/zMTVGA7tAC
// access key - AKIA2AFU73MDRLJFQMVK