import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';

const Example = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Load service account credentials from a JSON file
        const serviceAccount = require('./api.json');

        // Create a JWT client using the service account credentials
        const auth = new google.auth.JWT(
          serviceAccount.client_email,
          null,
          serviceAccount.private_key,
          ['https://www.googleapis.com/auth/drive']
        );

        // Authorize the client
        await auth.authorize();

        // Create a Drive instance
        const drive = google.drive({ version: 'v3', auth });

        // Specify the folder ID of the folder you want to retrieve files from
        const folderId = '1zbpvpNDwCG-cg04Sus9304P5OUyqoa3R';

        // List files in the specified folder
        const response = await drive.files.list({
          q: `'${folderId}' in parents`,
          fields: 'files(id, name, webViewLink)',
        });

        // Set the retrieved files in the state
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Files in Google Drive Folder</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Example;
