import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import Carousel from '@/components/sections/Carousel'
import { getLatestArticles, formatDate, getArticleSlug } from '@/utils/warroom'
import fs from 'fs';
import path from 'path';

// Map of news images to use for articles based on keywords in their titles
const NEWS_IMAGES = {
  'perkins': '/images/news/Perkins-Coie.jpg',
  'china': '/images/news/usa-ai.jpg',
  'prison': '/images/news/j6-prisoners.jpg',
  'collins': '/images/news/francis-collins.jpg',
  'clown': '/images/news/clowns.jpg',
  'brennan': '/images/news/brennan.jpg',
  'default': '/images/news/warroom-logo.jpg'
}

function getNewsImage(title: string): string {
  const lowercaseTitle = title.toLowerCase();
  const matchingKey = Object.keys(NEWS_IMAGES).find(key => lowercaseTitle.includes(key));
  return matchingKey ? NEWS_IMAGES[matchingKey as keyof typeof NEWS_IMAGES] : NEWS_IMAGES.default;
}

export default async function Home() {
  const latestArticles = await getLatestArticles(3); // Get 3 latest articles
  const imagesDirectory = path.join(process.cwd(), 'public/images/natalie-winters');
  let imageFiles = fs.readdirSync(imagesDirectory);
  
  // Remove any duplicate file names that might exist
  imageFiles = [...new Set(imageFiles)];
  
  // Create a unique set of items based on the file path
  const uniqueImagePaths = new Set();
  const uniqueItems = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const imagePath = `/images/natalie-winters/${file}`;
    
    // Only add this image if we haven't seen this path before
    if (!uniqueImagePaths.has(imagePath)) {
      uniqueImagePaths.add(imagePath);
      uniqueItems.push({
        id: uniqueItems.length + 1,
        title: `Image ${uniqueItems.length + 1}`,
        description: '',
        image: imagePath
      });
    }
  }

  return (
    <main>
      <PageHero 
        title="Natalie G. Winters"
        subtitle="White House Press Correspondent."
        imageSrc="/images/natalie-winters/natalie-winters-3.jpg"
        imagePosition="center 15%"
      />
      <Carousel items={uniqueItems} />
      
      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="content-container">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link 
                key={`${article.title}-${article.timestamp}`}
                href={`/news/${getArticleSlug(article.url)}`}
                className="group border border-gray-200 rounded-lg overflow-hidden block hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
                  <Image
                    src={getNewsImage(article.url)}
                    alt={article.title}
                    fill
                    className="object-contain bg-white p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-pink-50 rounded-b-lg">
                  <h2 className="text-xl font-serif font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {article.title.length > 50 ? `${article.title.slice(0, 50)}...` : article.title}
                  </h2>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <span>{formatDate(article.timestamp)}</span>
                    <span>•</span>
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
    </main>
  )
}
