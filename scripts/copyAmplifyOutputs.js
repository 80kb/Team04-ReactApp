const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'amplify_outputs.json'); // Adjust path if necessary
const destPath = path.join(__dirname, '..', 'src', 'amplify_outputs.json');

fs.copyFile(srcPath, destPath, (err) => {
  if (err) {
    console.error('Error copying amplify_outputs.json:', err);
  } else {
    console.log('amplify_outputs.json copied to src directory');
  }
});
