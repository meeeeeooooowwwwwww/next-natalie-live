import { promises as fs } from 'fs';
import path from 'path';

export interface WarroomVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  uploader: string;
}

export interface VideosFeed {
  [index: number]: WarroomVideo;
}

let cachedVideos: WarroomVideo[] = [];

export async function loadVideos(): Promise<WarroomVideo[]> {
  if (cachedVideos.length === 0) {
    try {
      const response = await fetch('/api/videos/natalie');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      cachedVideos = await response.json();
    } catch (error) {
      console.error('Error loading videos:', error);
      return [];
    }
  }
  return cachedVideos;
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
  const videos = await loadVideos();
  if (!videos) return null;
  return videos.find((video) => video.id === id);
}

export async function getLatestVideos(count: number = 10): Promise<WarroomVideo[]> {
  const videos = await getVideosFeed();
  return videos.slice(0, count);
}

export function getVideoSlug(url: string): string | null {
  if (!url) return null;
  
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
    return null;
  } catch (error) {
    console.error('Error extracting video ID:', error);
    return null;
  }
}

// Remove getVideoEmbedUrl if unused; embed URL is now hardcoded
// export function getVideoEmbedUrl(url: string): string {
//   // Implementation here
// } 

export async function generateStaticParams() {
  const videos = await loadVideos();
  if (!videos) return [];
  return videos.slice(0, 50).map((video) => ({ id: video.id }));
} 