import { NextResponse } from 'next/server';
import { getNatalieVideosFeed, getPaginatedNatalieVideos } from '@/utils/natalieVideos';

export async function GET(request: Request) {
  try {
    // Parse the request URL to get query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;

    // Get the videos
    const videos = await getPaginatedNatalieVideos(page, limit);

    // Return the videos as JSON
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error in natalie-videos API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Natalie Winters videos' },
      { status: 500 }
    );
  }
}

// Add a named export for the feed
export async function feed() {
  try {
    const videos = await getNatalieVideosFeed();
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error in natalie-videos feed API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Natalie Winters videos feed' },
      { status: 500 }
    );
  }
} 