import { WarroomVideo } from './videos';

let cachedWarroomVideos: WarroomVideo[] = [];

export async function getWarroomVideosFeed(): Promise<WarroomVideo[]> {
  if (cachedWarroomVideos.length === 0) {
    try {
      const response = await fetch('/api/videos/warroom');
      if (!response.ok) {
        throw new Error('Failed to fetch warroom videos');
      }
      cachedWarroomVideos = await response.json();
    } catch (error) {
      console.error('Error loading warroom videos:', error);
      return [];
    }
  }
  return cachedWarroomVideos;
} 