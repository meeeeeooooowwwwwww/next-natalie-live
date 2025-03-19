const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create output file stream
const output = fs.createWriteStream(path.join(__dirname, 'helios-next-backup.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for errors
archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add entire directory to the archive except node_modules and .next
archive.glob('**/*', {
  ignore: ['node_modules/**', '.next/**', 'helios-next-backup.zip', 'create-backup.js']
});

// Finalize the archive
archive.finalize();

console.log('Creating backup...');

output.on('close', () => {
  console.log(`Backup complete! Archive size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
}); 