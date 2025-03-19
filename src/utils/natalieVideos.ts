import fs from 'fs';
import path from 'path';
import { WarroomVideo } from './videos';

// Path to the Natalie Winters videos JSON file
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'natalie-videos.json');

/**
 * Read the Natalie Winters videos from the JSON file
 */
export async function getNatalieVideosFeed(): Promise<WarroomVideo[]> {
  try {
    // Read the JSON file
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const videos = JSON.parse(data) as WarroomVideo[];
    return videos;
  } catch (error) {
    console.error('Error reading Natalie Winters videos:', error);
    return [];
  }
}

/**
 * Get a Natalie Winters video by its ID
 */
export async function getNatalieVideoById(id: string): Promise<WarroomVideo | null> {
  const videos = await getNatalieVideosFeed();
  // Find video with matching ID
  const video = videos.find((video) => {
    const videoId = getVideoSlug(video.link);
    return videoId === id;
  });
  return video || null;
}

/**
 * Get the latest Natalie Winters videos, limited by count
 */
export async function getLatestNatalieVideos(count: number = 12): Promise<WarroomVideo[]> {
  const videos = await getNatalieVideosFeed();
  return videos.slice(0, count);
}

/**
 * Extract the video slug/ID from a URL
 * Using the same logic as in videos.ts
 */
export function getVideoSlug(url: string): string {
  if (!url) return '';
  
  try {
    // Look for ID in embed URL format (e.g., /embed/v6oa7gc)
    const embedMatch = url.match(/\/embed\/([a-zA-Z0-9]+)/i);
    if (embedMatch && embedMatch[1]) {
      return embedMatch[1];
    }
    
    // Look for ID in standard URL format (e.g., rumble.com/v6qi45w)
    const standardMatch = url.match(/rumble\.com\/([a-zA-Z0-9]+)/i);
    if (standardMatch && standardMatch[1]) {
      return standardMatch[1];
    }
    
    return '';
  } catch (error) {
    console.error('Error extracting video ID:', error);
    return '';
  }
}

/**
 * Get the embed URL for a video
 * Using the same logic as in videos.ts
 */
export function getVideoEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Get the video ID
  const videoId = getVideoSlug(url);
  if (!videoId) return '';
  
  // Return the standard embed format without the pub parameter
  return `https://rumble.com/embed/${videoId}/`;
}

/**
 * Get a paginated set of Natalie Winters videos
 */
export async function getPaginatedNatalieVideos(page: number, limit: number): Promise<WarroomVideo[]> {
  const videos = await getNatalieVideosFeed();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return videos.slice(startIndex, endIndex);
} 