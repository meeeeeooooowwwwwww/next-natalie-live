"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getVideoSlug } from '@/utils/videos';
import { getWarroomVideosFeed } from '@/utils/warroomVideos';
import PageHero from '@/components/sections/PageHero';
import { useEffect, useState } from 'react';

// Define a basic type for the video object
interface Video {
  link: string;
  thumbnail?: string;
  title: string;
}

// The main page component - now a Server Component
export default function BannonWarroomVideosPage() {
  const [allVideos, setAllVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6); // Show 6 videos initially

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos/warroom');
        const data = await response.json();
        setAllVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 6); // Load 6 more videos on each click
  };

  return (
    <>
      <PageHero 
        title="Bannon Warroom Videos"
        subtitle="Latest videos from Bannon's Warroom."
        imageSrc="/images/bannon-warroom/bannon-warroom.jpg"
        imagePosition="center 35%"
      />

      {/* Page Content */}
      <div className="py-12 content-container">
        {allVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {allVideos.slice(0, visibleVideos).map((video: Video, index: number) => {
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
                          Bannon's Warroom
                        </span>
                      </p>
                      <div className="flex space-x-2">
                        {/* Watch Video button temporarily hidden */}
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
            {visibleVideos < allVideos.length && (
              <div className="text-center">
                <button 
                  onClick={loadMoreVideos}
                  className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p>No videos available.</p>
          </div>
        )}
      </div>
    </>
  );
} 