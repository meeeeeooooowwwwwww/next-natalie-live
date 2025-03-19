const fs = require('fs');
const path = require('path');

// Function to extract video slug (copied from our src/utils/videos.ts)
function getVideoSlug(url) {
  if (!url) return '';
  
  try {
    // Look for ID in standard URL format (e.g., rumble.com/v6qi45w)
    const standardMatch = url.match(/rumble\.com\/([a-zA-Z0-9]+)/i);
    if (standardMatch && standardMatch[1]) {
      console.log(`Found standard ID: ${standardMatch[1]}`);
      return standardMatch[1];
    }
    
    console.log(`No ID found in URL: ${url}`);
    return '';
  } catch (error) {
    console.error('Error extracting video ID:', error);
    return '';
  }
}

// Function to create embed URL (copied from our updated src/utils/videos.ts)
function getVideoEmbedUrl(url) {
  if (!url) return '';
  
  const videoId = getVideoSlug(url);
  if (!videoId) return '';
  
  return `https://rumble.com/embed/${videoId}/`;
}

// Read the JSON file
try {
  const jsonPath = path.join(__dirname, 'src', 'data', 'videos', 'videos.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Get the 10th video (index 9)
  const video = data[9];
  console.log('Video Title:', video.title);
  console.log('Original URL:', video.link);
  
  // Extract video ID
  const videoId = getVideoSlug(video.link);
  console.log('Extracted ID:', videoId);
  
  // Generate embed URL
  const embedUrl = getVideoEmbedUrl(video.link);
  console.log('Embed URL:', embedUrl);
  
} catch (error) {
  console.error('Error processing video data:', error);
} 