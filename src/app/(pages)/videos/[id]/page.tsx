'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaTwitter, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { getVideoSlug, getVideoEmbedUrl } from '@/utils/videos';
import Script from 'next/script';

type Props = {
  params: { id: string }
}

export default function VideoPage({ params }: Props) {
  const id = params.id;
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Create the embed URL directly from the ID parameter without the pub parameter
  const embedUrl = `https://rumble.com/embed/${id}/`;

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        console.log(`Video ID from URL: ${id}`);
        console.log(`Trying embed URL: ${embedUrl}`);
        
        // Explicitly use port 3002 to match the server
        const res = await fetch(`http://localhost:3002/api/videos/feed`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        
        const videos = await res.json();
        
        // Find video metadata if available (but we'll show the embed regardless)
        const foundVideo = videos.find((v: any) => {
          const slug = getVideoSlug(v.link);
          return slug === id;
        });
        
        if (foundVideo) {
          console.log(`Found matching video: ${foundVideo.title}`);
          console.log(`  Original link: ${foundVideo.link}`);
          setVideo(foundVideo);
        } else {
          console.log('No matching metadata found, but embed will still work');
        }
      } catch (err: any) {
        console.error('Error loading video metadata:', err);
        // Don't set error - we can still try to show the embed
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, embedUrl]);

  // Check for iframe loading errors
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const handleLoad = () => {
      console.log('Iframe loaded successfully');
    };
    
    const handleError = () => {
      console.error('Iframe failed to load');
      setError('Failed to load video');
    };
    
    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [loading]);

  // Alternative option: Insert a direct Rumble script
  useEffect(() => {
    // Only run this after loading is complete
    if (loading) return;
    
    // Try to create a Rumble script element to load the video
    try {
      const script = document.createElement('script');
      script.src = 'https://rumble.com/embedJS/u3/';
      script.async = true;
      
      const scriptContainer = document.getElementById('rumble-script-container');
      if (scriptContainer) {
        // Clear container first
        scriptContainer.innerHTML = '';
        scriptContainer.appendChild(script);
      }
    } catch (err) {
      console.error('Failed to insert Rumble script:', err);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/videos" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
        <FaArrowLeft className="mr-2" />
        <span>Back to Videos</span>
      </Link>
      
      {video ? (
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{video.title}</h1>
      ) : (
        <h1 className="text-3xl md:text-4xl font-bold mb-8">War Room Video</h1>
      )}
      
      {/* Video Player - using Next.js Script for embedding */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        {/* Approach 1: Direct iframe */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={video?.title || 'War Room Video'}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            frameBorder="0"
            allowFullScreen
            onLoad={() => console.log('Iframe content loaded successfully')}
            onError={(e) => console.error('Iframe failed to load:', e)}
          ></iframe>
        </div>

        {/* Approach 2: Using Rumble's script */}
        <div id="rumble-script-container" className="mt-8">
          {/* Script will be inserted here via useEffect */}
        </div>
        
        {/* Approach 3: Using Next.js Script component */}
        <Script
          id="rumble-script"
          strategy="afterInteractive"
          src="https://rumble.com/embedJS/u3/"
        />
      </div>
      
      {/* Debug info */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
        <p><strong>Video ID:</strong> {id}</p>
        <p><strong>Embed URL:</strong> {embedUrl}</p>
        <p><strong>Original URL:</strong> {video?.link || 'N/A'}</p>
        
        {/* Add option to open in a new tab */}
        <div className="mt-4">
          <a 
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 underline"
          >
            Open embed URL directly in new tab
          </a>
        </div>
      </div>
      
      {/* Direct link to Rumble */}
      <div className="text-center mb-8">
        <a 
          href={video?.link || `https://rumble.com/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Watch on Rumble
        </a>
      </div>
      
      {/* Video Info - only show if we have video metadata */}
      {video && (
        <>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div>
                <p className="text-gray-500 mb-2">Source: {video.uploader.replace('https://', '')}</p>
              </div>
              <div className="flex space-x-4">
                <a 
                  href={`https://x.com/intent/tweet?url=${encodeURIComponent(video.link)}&text=${encodeURIComponent(video.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="Share on X (Twitter)"
                >
                  <FaTwitter size={20} />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(video.link)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(video.title)}&body=${encodeURIComponent(video.link)}`}
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* WarRoom Info */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-lg">War Room</div>
                </div>
              </div>
              
              <p className="mb-4 text-gray-700 font-medium">
                Stay ahead of the censors – <a href="https://warroom.org/join" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Join us warroom.org/join</a>
              </p>
              
              <div className="mt-4 text-sm text-gray-500">
                <span>#news #politics #realnews</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 