import fs from 'fs';
import path from 'path';
import { WarroomVideo } from './videos';

// Dynamically determine the correct path based on environment
const getDataFilePath = () => {
  // Main path that works in development
  const devPath = path.join(process.cwd(), 'src', 'data', 'natalie-videos.json');
  
  // Alternative paths to try in production environments
  const alternatives = [
    path.join(process.cwd(), 'src', 'data', 'natalie-videos.json'),
    path.join(process.cwd(), 'data', 'natalie-videos.json'),
    path.join(process.cwd(), '.vercel', 'output', 'functions', 'data', 'natalie-videos.json'),
    path.join(process.cwd(), '.vercel', 'output', 'static', 'data', 'natalie-videos.json')
  ];
  
  // In development, just use the dev path
  if (process.env.NODE_ENV === 'development') {
    return devPath;
  }
  
  // In production, try the alternatives
  for (const altPath of alternatives) {
    try {
      if (fs.existsSync(altPath)) {
        return altPath;
      }
    } catch (error) {
      // Ignore errors for non-existent paths
    }
  }
  
  // Default to the dev path if none of the alternatives exist
  return devPath;
};

// Function to safely read the JSON data
const readJsonData = async (): Promise<WarroomVideo[]> => {
  try {
    const filePath = getDataFilePath();
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as WarroomVideo[];
  } catch (error) {
    console.error('Error reading JSON file:', error);
    
    // Fallback: try to fetch from the public URL 
    if (typeof window !== 'undefined' || typeof fetch !== 'undefined') {
      try {
        console.log('Attempting to fetch from public URL');
        // Use relative URL to avoid CORS issues
        const publicUrl = '/data/natalie-videos.json';
        const response = await fetch(publicUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return await response.json() as WarroomVideo[];
      } catch (fetchError) {
        console.error('Error fetching JSON from public URL:', fetchError);
        return [];
      }
    }
    
    return [];
  }
};

/**
 * Read the Natalie Winters videos from the JSON file
 */
export async function getNatalieVideosFeed(): Promise<WarroomVideo[]> {
  return await readJsonData();
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