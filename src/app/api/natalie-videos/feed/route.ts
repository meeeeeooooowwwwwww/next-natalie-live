import { NextResponse } from 'next/server';
import { getNatalieVideosFeed } from '@/utils/natalieVideos';

export async function GET() {
  try {
    // Get all Natalie Winters videos
    const videos = await getNatalieVideosFeed();
    
    // Return the videos as JSON
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error in natalie-videos feed API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Natalie Winters videos feed' },
      { status: 500 }
    );
  }
} 