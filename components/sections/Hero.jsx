import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 
                        dark:from-coffee-950 dark:via-coffee-900 dark:to-coffee-800">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10"></div>

      <div className="relative container section-padding">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main heading */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 
                           font-serif font-bold text-coffee-900 dark:text-cream-100 mb-6 leading-tight">
              Welcome to My
              <span className="block text-coffee-700 dark:text-amber-400">
                Literary World
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-600 dark:text-cream-300 
                          leading-relaxed max-w-3xl mx-auto mb-6">
              I'm <span className="font-serif font-semibold text-coffee-800 dark:text-cream-200">
                {SITE_CONFIG.author}
              </span>, an author who believes in the power of storytelling to connect hearts 
              and transform perspectives.
            </p>
            
            <p className="text-coffee-500 dark:text-cream-400 max-w-2xl mx-auto">
              Discover stories that warm the soul and join a community of readers who believe in the magic of words.
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#featured-works"
              className="inline-flex items-center justify-center px-6 py-3 bg-coffee-700 text-cream-50 hover:bg-coffee-800 rounded-lg font-medium transition-colors"
            >
              Explore My Books
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-coffee-700 text-coffee-700 hover:bg-coffee-700 hover:text-cream-50 rounded-lg font-medium transition-colors"
            >
              Read Recent Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Social proof or testimonial */}
          <div className="mt-16 pt-8 border-t border-coffee-200 dark:border-coffee-700">
            <blockquote className="text-coffee-600 dark:text-cream-400 italic text-lg max-w-2xl mx-auto">
              "Stories have the power to change us, one page at a time."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
} 