'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-gray-800 hover:text-primary-500 transition-colors">
            Natalie G. Winters
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200">
              Home
            </Link>
            <Link href="/news" className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200">
              News
            </Link>
            <Link href="/about" className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200">
              Contact
            </Link>
            <Link 
              href="/subscribe" 
              className="inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-primary-500 rounded-lg shadow-sm hover:bg-primary-600 transition-all duration-200"
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 hover:text-primary-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/news"
              className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200 text-lg"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              href="/about"
              className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200 text-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 font-medium hover:text-primary-500 transition-colors duration-200 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-primary-500 rounded-lg shadow-sm hover:bg-primary-600 transition-all duration-200 text-center"
              onClick={() => setIsOpen(false)}
            >
              Subscribe
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 