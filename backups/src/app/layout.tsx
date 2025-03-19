import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nataliegwinters.com"),
  title: "Natalie G. Winters - Author & Investigative Journalist",
  description: "Official website of Natalie G. Winters - Author, investigative journalist, and host covering politics, culture, and current events.",
  keywords: ["Natalie G Winters", "journalism", "politics", "culture", "current events", "9/11 files", "investigative reporting"],
  authors: [{ name: "Natalie G. Winters" }],
  openGraph: {
    title: "Natalie G. Winters - Author & Investigative Journalist",
    description: "Official website of Natalie G. Winters - Author, investigative journalist, and host covering politics, culture, and current events.",
    url: "https://nataliegwinters.com",
    siteName: "Natalie G. Winters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natalie G. Winters - Author & Investigative Journalist",
    description: "Official website of Natalie G. Winters - Author, investigative journalist, and host covering politics, culture, and current events.",
    creator: "@NatalieGWinters",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-gray-800">
        <Header />
        <div className="relative pt-16">
          {children}
        </div>
        <footer className="bg-gray-100 text-gray-800 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">About Natalie</h3>
                <p className="text-gray-600">
                  Author, investigative journalist, and host covering politics, culture, and current events.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-600 hover:text-primary-500 transition-colors">About</a></li>
                  <li><a href="/videos" className="text-gray-600 hover:text-primary-500 transition-colors">Videos</a></li>
                  <li><a href="/news" className="text-gray-600 hover:text-primary-500 transition-colors">News</a></li>
                  <li><a href="/shop" className="text-gray-600 hover:text-primary-500 transition-colors">Shop</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Natalie G. Winters. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
