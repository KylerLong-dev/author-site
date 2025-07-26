import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 
                    dark:from-coffee-950 dark:via-coffee-900 dark:to-coffee-800 
                    flex items-center justify-center">
      <div className="container section-padding">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-coffee-300 dark:text-coffee-700 mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          {/* Error message */}
          <div className="mb-12">
            <h2 className="text-display-lg font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-coffee-600 dark:text-cream-300 leading-relaxed mb-6">
              Looks like this page has wandered off into another story. 
              Don't worry, even the best characters sometimes take unexpected detours.
            </p>
            <p className="text-coffee-500 dark:text-cream-400">
              Let's get you back to where the story continues.
            </p>
          </div>

          {/* Navigation options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button asChild className="btn-primary h-auto py-4 px-6 flex flex-col items-center gap-2">
              <Link href="/">
                <Home className="h-6 w-6" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="btn-outline h-auto py-4 px-6 flex flex-col items-center gap-2">
              <Link href="/blog">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm font-medium">Blog</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="btn-outline h-auto py-4 px-6 flex flex-col items-center gap-2">
              <Link href="/about">
                <Search className="h-6 w-6" />
                <span className="text-sm font-medium">About</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="btn-outline h-auto py-4 px-6 flex flex-col items-center gap-2">
              <Link href="/contact">
                <ArrowLeft className="h-6 w-6" />
                <span className="text-sm font-medium">Contact</span>
              </Link>
            </Button>
          </div>

          {/* Back button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="text-coffee-600 dark:text-cream-400 hover:text-coffee-800 dark:hover:text-cream-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button asChild className="btn-secondary">
              <Link href="/">
                Take Me Home
              </Link>
            </Button>
          </div>

          {/* Inspirational quote */}
          <div className="mt-16 pt-8 border-t border-coffee-200 dark:border-coffee-700">
            <blockquote className="text-coffee-600 dark:text-cream-400 italic text-lg">
              "Not all who wander are lost, but this page certainly is."
            </blockquote>
            <cite className="text-coffee-500 dark:text-cream-500 text-sm mt-2 block">
              — With apologies to J.R.R. Tolkien
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
} 