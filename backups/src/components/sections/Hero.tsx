'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/natalie-winters/natalie-winters-12.jpg"
          alt="Natalie G. Winters"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-black bg-opacity-40 rounded-xl px-8 py-12 border border-white border-opacity-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
            Natalie G. Winters
          </h1>
          
          <p className="text-xl md:text-2xl text-white opacity-90 max-w-2xl mx-auto mb-12">
            Breaking news, investigative journalism, and in-depth analysis of politics, culture, and current events.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/news" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-500 rounded-lg shadow-sm hover:bg-primary-600 transition-all duration-200">
              Latest News
            </Link>
            <Link href="/subscribe" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg shadow-sm transition-all duration-200 border-2 border-white text-white hover:bg-white hover:bg-opacity-10">
              Subscribe Now
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
} 