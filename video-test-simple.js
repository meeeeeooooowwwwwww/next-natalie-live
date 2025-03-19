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

// Test with several different video URLs
const testUrls = [
  "https://rumble.com/v6qi45w-warroom-battleground-ep-722-whistle-blower-exclusive-dc-catholic-church-exp.html",
  "https://rumble.com/v6qi3pq-episode-4330-house-passes-cr-markets-continue-to-shake.html?e9s=src_v1_ucp",
  "https://rumble.com/v6qi0qo-media-push-of-measles-outbreak-is-no-coincidence-mary-holland-of-childrens-.html?e9s=src_v1_ucp",
  "https://rumble.com/v6qi07w-former-facebook-employee-sounds-alarm-on-companys-approach-to-china.html?e9s=src_v1_ucp",
  "https://rumble.com/v6qhzrj-episode-4329-peter-kaiser-is-a-name-change-on-the-horizon-for-hunter-biden.html?e9s=src_v1_ucp"
];

// Process each URL
testUrls.forEach((url, index) => {
  console.log(`\nProcessing video ${index + 1}:`);
  console.log('Original URL:', url);
  
  // Extract video ID
  const videoId = getVideoSlug(url);
  console.log('Extracted ID:', videoId);
  
  // Generate embed URL
  const embedUrl = getVideoEmbedUrl(url);
  console.log('Embed URL:', embedUrl);
  
  // Generate iframe HTML
  const iframeHtml = `<iframe src="${embedUrl}" style="position: absolute; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>`;
  console.log('iframe HTML:', iframeHtml);
}); 