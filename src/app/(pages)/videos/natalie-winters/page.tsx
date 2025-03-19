'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getVideoSlug, getVideoEmbedUrl } from '@/utils/videos'
import PageHero from '@/components/sections/PageHero';

// Define the video type
interface WarroomVideo {
  title: string;
  link: string;
  thumbnail: string;
  uploader: string;
}

export default function NatalieVideosPage() {
  const [videos, setVideos] = useState<WarroomVideo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videosPerPage = 12;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Use the Natalie Winters videos API route
        const response = await fetch(`/api/natalie-videos?limit=${videosPerPage * page}`);
        if (!response.ok) throw new Error('Failed to fetch Natalie Winters videos');
        const data = await response.json();
        setVideos(data);
        setError(null);
      } catch (err: any) {
        console.error('Error loading Natalie Winters videos:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  const loadMoreVideos = () => {
    setPage(page + 1);
  };

  return (
    <>
      <PageHero 
        title="Natalie's Videos"
        subtitle="Natalie Winter's videos."
        imageSrc="/images/natalie-winters/natalie-winters-12.jpg"
        imagePosition="center 35%"
      />

      {/* Page Content */}
      <div className="py-12 content-container">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-6">
            Error: {error}
          </div>
        )}

        {/* Loading spinner */}
        {loading && page === 1 && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
          </div>
        )}

        {/* Videos grid */}
        {videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {videos.map((video, index) => {
              const slug = getVideoSlug(video.link);
              if (!slug) return null;
              
              return (
                <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <Link 
                    href={`/videos/${slug}`}
                  >
                    <div className="relative pb-[56.25%]">
                      {video.thumbnail ? (
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                          <span className="text-white">No thumbnail available</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-white">{video.title}</h2>
                    <p className="text-sm text-gray-300 mb-4">
                      <span className="hover:text-pink-400 transition-colors">
                        Natalie Winters
                      </span>
                    </p>
                    <div className="flex space-x-2">
                      <Link 
                        href={`/videos/${slug}`}
                        className="text-sm px-3 py-1 bg-pink-400 text-white rounded hover:bg-pink-500 transition-colors"
                      >
                        Watch Video
                      </Link>
                      <a 
                        href={video.link} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Watch on Rumble
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No videos message */}
        {!loading && videos.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No videos found.</p>
          </div>
        )}

        {/* Load more button */}
        {videos.length > 0 && videos.length >= videosPerPage * page && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreVideos}
              className="px-6 py-3 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors flex items-center"
              disabled={loading}
            >
              {loading && page > 1 ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  Loading...
                </>
              ) : (
                'Load More Videos'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
} 