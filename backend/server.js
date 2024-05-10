const express = require('express');
const app = express();

const { google } = require('googleapis');
const fs = require('fs');

// Load client secrets from a JSON file
const credentials = require('./Credentials.json');

const { client_secret, client_id, redirect_uris } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris
);

// Generate a URL for user consent
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/drive.metadata.readonly']
});

// Exchange authorization code for access token
const getToken = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

// Authorize a client with credentials, then call the Google Drive API
const listFiles = async () => {
  try {
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.forEach(file => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  } catch (err) {
    console.error('Error listing files:', err);
  }
};

// Example usage
const code = 'Access Token';
// getToken(code).then(listFiles);

app.listen(7000, () => {
    console.log('Form running on port 7000');
  }); 
