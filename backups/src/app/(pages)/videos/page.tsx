import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos - Natalie G. Winters',
  description: 'Watch the latest videos from Natalie G. Winters covering politics, culture, and current events.',
}

export default function VideosPage() {
  const videos = [
    {
      id: 1,
      title: 'Breaking Investigation: Latest Developments',
      description: 'An in-depth look at recent political developments and their implications.',
      thumbnail: '/images/video-1.jpg',
      videoId: 'video-id-1',
      date: 'March 15, 2024',
    },
    {
      id: 2,
      title: 'Special Report: Uncovering the Truth',
      description: 'Exclusive coverage of breaking news and investigative findings.',
      thumbnail: '/images/video-2.jpg',
      videoId: 'video-id-2',
      date: 'March 10, 2024',
    },
    {
      id: 3,
      title: 'Interview Series: Key Figures Speak Out',
      description: 'One-on-one interviews with influential figures in politics and media.',
      thumbnail: '/images/video-3.jpg',
      videoId: 'video-id-3',
      date: 'March 5, 2024',
    },
    // Add more videos as needed
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12">Latest Videos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <article key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
                {video.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{video.date}</span>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Watch Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Load More Videos
        </button>
      </div>
    </div>
  )
} 