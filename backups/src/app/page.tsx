import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import Carousel from '@/components/sections/Carousel'
import { getLatestArticles, formatDate, getArticleSlug } from '@/utils/warroom'
import fs from 'fs';
import path from 'path';

// Add the missing getNewsImage function
function getNewsImage(url: string) {
  // Default image for news articles
  return '/images/news/warroom-logo.jpg';
}

export default async function Home() {
  const latestArticles = await getLatestArticles(3); // Get 3 latest articles
  const imagesDirectory = path.join(process.cwd(), 'public/images/natalie-winters');
  const imageFiles = fs.readdirSync(imagesDirectory);

  const items = imageFiles.map((file, index) => ({
    id: index + 1,
    title: `Image ${index + 1}`,
    description: '',
    image: `/images/natalie-winters/${file}`
  }));

  return (
    <main>
      <Hero />
      <Carousel items={items} />
      
      {/* Latest News Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link 
                key={`${article.title}-${article.timestamp}`}
                href={`/news/${getArticleSlug(article.url)}`}
                className="group"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={getNewsImage(article.url)}
                    alt={article.title}
                    fill
                    className="object-contain bg-white p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {article.title.length > 50 ? `${article.title.slice(0, 50)}...` : article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{formatDate(article.timestamp)}</span>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/news" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Experience blazing fast performance with our optimized platform.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Modern Design</h3>
              <p className="text-gray-600">Beautiful, responsive design that looks great on any device.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customizable</h3>
              <p className="text-gray-600">Easily customize every aspect to match your brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join us today and experience the difference.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
