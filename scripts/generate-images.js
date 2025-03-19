const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Create directories if they don't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR);
}

// Image configurations
const images = [
  { name: 'hero-bg.jpg', width: 1920, height: 1080, text: 'Hero Background' },
  { name: 'about-hero.jpg', width: 1920, height: 1080, text: 'About Hero' },
  { name: 'about-profile.jpg', width: 800, height: 1000, text: 'Profile Photo' },
  { name: 'featured-news.jpg', width: 1200, height: 800, text: 'Featured News' },
  { name: 'featured-product.jpg', width: 800, height: 800, text: 'Featured Product' },
  { name: '911-hero.jpg', width: 1920, height: 1080, text: '9/11 Files Hero' },
  // News images
  ...Array.from({ length: 4 }, (_, i) => ({
    name: `news-${i + 1}.jpg`,
    width: 800,
    height: 600,
    text: `News ${i + 1}`,
  })),
  // Post images
  ...Array.from({ length: 3 }, (_, i) => ({
    name: `post-${i + 1}.jpg`,
    width: 800,
    height: 600,
    text: `Post ${i + 1}`,
  })),
  // Video thumbnails
  ...Array.from({ length: 3 }, (_, i) => ({
    name: `video-${i + 1}.jpg`,
    width: 800,
    height: 450,
    text: `Video ${i + 1}`,
  })),
  // Book covers
  ...Array.from({ length: 2 }, (_, i) => ({
    name: `book-${i + 1}.jpg`,
    width: 600,
    height: 900,
    text: `Book ${i + 1}`,
  })),
  // Course image
  { name: 'course-1.jpg', width: 800, height: 600, text: 'Course' },
  // 9/11 Files images
  ...Array.from({ length: 3 }, (_, i) => ({
    name: `911-${i + 1}.jpg`,
    width: 800,
    height: 600,
    text: `9/11 File ${i + 1}`,
  })),
];

// Generate a random pastel color
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}

// Create placeholder images
images.forEach(({ name, width, height, text }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background with a pastel color
  ctx.fillStyle = getRandomPastelColor();
  ctx.fillRect(0, 0, width, height);

  // Add a subtle pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      ctx.fillRect(i, j, 10, 10);
    }
  }

  // Add text
  ctx.font = `${Math.min(width, height) * 0.1}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(IMAGES_DIR, name), buffer);
  console.log(`Generated ${name}`);
});

console.log('All placeholder images have been generated!'); 