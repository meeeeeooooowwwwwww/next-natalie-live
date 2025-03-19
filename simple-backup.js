const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('Creating project backup...');

// Windows command to create a zip file using PowerShell
const command = `powershell -Command "Compress-Archive -Path . -DestinationPath helios-next-backup.zip -Force -Exclude 'node_modules', '.next', 'helios-next-backup.zip', 'simple-backup.js'"`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log('Backup completed successfully! File: helios-next-backup.zip');
}); 