export interface WarroomVideo {
  title: string;
  link: string;
  thumbnail: string;
  uploader: string;
}

export interface VideosFeed {
  [index: number]: WarroomVideo;
}

export async function getVideosFeed(): Promise<WarroomVideo[]> {
  const response = await fetch('http://localhost:3002/api/videos/feed');
  if (!response.ok) {
    throw new Error('Failed to fetch videos feed');
  }
  return response.json();
}

/**
 * Get a video by its ID/slug
 */
export async function getVideoById(id: string) {
  // Get all videos from the feed
  const videos = await getVideosFeed();
  
  // Find the video with matching ID
  const video = videos.find(video => {
    const videoId = getVideoSlug(video.link);
    return videoId === id;
  });
  
  return video || null;
}

export async function getLatestVideos(count: number = 10): Promise<WarroomVideo[]> {
  const videos = await getVideosFeed();
  return videos.slice(0, count);
}

export function getVideoSlug(url: string): string {
  if (!url) return '';
  
  // Extract the video ID from the Rumble URL
  // Examples:
  // https://rumble.com/v6qi45w-warroom-battleground-ep-722-whistle-blower-exclusive-dc-catholic-church-exp.html
  // https://rumble.com/embed/v6oa7gc/?pub=4kxtac
  
  try {
    // Look for ID in embed URL format (e.g., /embed/v6oa7gc)
    const embedMatch = url.match(/\/embed\/([a-zA-Z0-9]+)/i);
    if (embedMatch && embedMatch[1]) {
      const id = embedMatch[1];
      console.log(`Found embed ID: ${id}`);
      return id;
    }
    
    // Look for ID in standard URL format (e.g., rumble.com/v6qi45w)
    const standardMatch = url.match(/rumble\.com\/([a-zA-Z0-9]+)/i);
    if (standardMatch && standardMatch[1]) {
      const id = standardMatch[1];
      console.log(`Found standard ID: ${id}`);
      return id;
    }
    
    console.log(`No ID found in URL: ${url}`);
    return '';
  } catch (error) {
    console.error('Error extracting video ID:', error);
    return '';
  }
}

export function getVideoEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Get the video ID
  const videoId = getVideoSlug(url);
  if (!videoId) return '';
  
  // Return the standard embed format without the pub parameter
  return `https://rumble.com/embed/${videoId}/`;
} 