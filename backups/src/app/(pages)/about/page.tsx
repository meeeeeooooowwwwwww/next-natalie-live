import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'About - Natalie G. Winters',
  description: 'Learn more about Natalie G. Winters - Author, investigative journalist, and host covering politics, culture, and current events.',
}

export default function AboutPage() {
  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-16">
        <Image
          src="/images/about-hero.jpg"
          alt="Natalie G. Winters"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About Natalie G. Winters
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Author, investigative journalist, and host covering politics, culture, and current events.
          </p>
        </div>
      </div>

      {/* Biography Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-6">Biography</h2>
          <div className="prose prose-lg">
            <p className="mb-4">
              Natalie G. Winters is a renowned investigative journalist known for her groundbreaking reporting on politics, national security, and cultural issues. With a career spanning over a decade, she has established herself as a trusted voice in journalism, consistently breaking major stories that have shaped national conversations.
            </p>
            <p className="mb-4">
              As a regular contributor to leading news outlets and a frequent guest on national television programs, Natalie brings her expertise and insight to complex issues facing our society. Her work has been recognized with numerous awards and has led to significant policy changes and reforms.
            </p>
            <p>
              Beyond her journalistic work, Natalie is also an accomplished author and public speaker, engaging audiences across the country with her deep knowledge of current events and her commitment to uncovering the truth.
            </p>
          </div>
        </div>
        <div>
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src="/images/about-profile.jpg"
              alt="Natalie G. Winters Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Work */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-bold mb-8">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Investigative Reporting</h3>
            <p className="text-gray-600 mb-4">
              Award-winning investigations into national security, political corruption, and social issues.
            </p>
            <Link href="/news" className="text-primary-600 hover:text-primary-700 font-medium">
              View Stories →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Video Series</h3>
            <p className="text-gray-600 mb-4">
              In-depth video reports and interviews with key figures in politics and media.
            </p>
            <Link href="/videos" className="text-primary-600 hover:text-primary-700 font-medium">
              Watch Now →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Publications</h3>
            <p className="text-gray-600 mb-4">
              Books and articles examining critical issues facing our society.
            </p>
            <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-medium">
              Browse Books →
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          For media inquiries, speaking engagements, or other professional matters, please use the contact form below.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Contact Natalie
        </Link>
      </div>
    </div>
  )
} 