import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'videos', 'videos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const videos = JSON.parse(fileContents);
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos feed:', error);
    return NextResponse.json({ error: 'Failed to fetch videos feed' }, { status: 500 });
  }
} 