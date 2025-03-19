import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get('limit') || '12');
  
  try {
    const feedResponse = await fetch(new URL('/api/videos/feed', request.url));
    
    if (!feedResponse.ok) {
      throw new Error('Failed to fetch videos feed');
    }
    
    const allVideos = await feedResponse.json();
    const videos = allVideos.slice(0, limit);
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
} 