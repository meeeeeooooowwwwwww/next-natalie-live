import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getVideoSlug } from '@/utils/videos';
import { getNatalieVideosFeed } from '@/utils/natalieVideos';
import PageHero from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: "Natalie's Videos | War Room Reports",
  description: "Latest videos featuring Natalie Winters from War Room"
};

// The main page component - now a Server Component
export default async function NatalieVideosPage() {
  // Use direct utility function call instead of API route
  const videos = await getNatalieVideosFeed();
  
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
        {/* Videos grid */}
        {videos.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No videos found.</p>
          </div>
        )}
      </div>
    </>
  );
} 