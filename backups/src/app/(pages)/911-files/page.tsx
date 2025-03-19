import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '9/11 Files - Natalie G. Winters',
  description: 'Comprehensive investigation and analysis of the events surrounding 9/11, uncovering new evidence and perspectives.',
}

export default function NineElevenFilesPage() {
  const timelineEvents = [
    {
      id: 1,
      date: 'September 2023',
      title: 'New Evidence Emerges',
      description: 'Recently uncovered documents reveal previously unknown details about the events leading up to September 11.',
      image: '/images/911-1.jpg',
      category: 'Investigation',
    },
    {
      id: 2,
      date: 'August 2023',
      title: 'Expert Analysis',
      description: 'Leading experts provide detailed analysis of newly discovered evidence and its implications.',
      image: '/images/911-2.jpg',
      category: 'Analysis',
    },
    {
      id: 3,
      date: 'July 2023',
      title: 'Witness Testimonies',
      description: 'Exclusive interviews with key witnesses provide new perspectives on the events.',
      image: '/images/911-3.jpg',
      category: 'Interviews',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-16">
        <Image
          src="/images/911-hero.jpg"
          alt="9/11 Files"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              The 9/11 Files
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4">
              A comprehensive investigation into one of the most significant events in modern history.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-4xl mx-auto mb-16">
        <p className="lead text-xl text-gray-600">
          The 9/11 Files represent years of investigative journalism, featuring exclusive interviews,
          document analysis, and expert testimonies. This ongoing investigation continues to uncover
          new evidence and perspectives about the events surrounding September 11.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Investigation Timeline</h2>
        <div className="space-y-12">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              
              <div className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2" />
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 relative w-full md:w-48 h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-primary-600 font-medium">
                          {event.date}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>
                      <Link
                        href={`/911-files/${event.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Read Full Report →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Support This Investigation</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Your support helps fund ongoing investigative work and enables us to continue uncovering the truth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Purchase Full Report
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Submit Information
          </Link>
        </div>
      </div>
    </div>
  )
} 