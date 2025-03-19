import path from 'path';
import { promises as fs } from 'fs';

export interface WarroomArticle {
  title: string;
  author: string;
  timestamp: string;
  categories: string[];
  url: string;
  ordered_content: {
    type: 'paragraph' | 'heading';
    text: string;
  }[];
}

export interface WarroomFeed {
  articles: WarroomArticle[];
}

export async function getWarroomFeed(): Promise<WarroomFeed> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'warroom-feed.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as WarroomFeed;
}

export async function getWarroomArticle(id: string): Promise<WarroomArticle | null> {
  const feed = await getWarroomFeed();
  const article = feed.articles.find((article) => {
    // Extract the last part of the URL as the ID
    const urlParts = article.url.split('/');
    const slug = urlParts[urlParts.length - 2]; // Get the second to last part (before trailing slash)
    return slug === id;
  });
  return article || null;
}

export async function getLatestArticles(count: number = 10): Promise<WarroomArticle[]> {
  const feed = await getWarroomFeed();
  return feed.articles
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, count);
}

export async function getWarroomArticles(): Promise<WarroomArticle[]> {
  const feed = await getWarroomFeed();
  return feed.articles;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getArticleSlug(url: string): string {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2]; // Get the second to last part (before trailing slash)
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/onclick|onload|onerror|onmouseover|onmouseout/gi, 'on-blocked-') // Remove event handlers
    .replace(/(href=["']javascript:)/gi, 'href="#"'); // Remove javascript: URLs
} 