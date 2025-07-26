import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Calendar, Award } from 'lucide-react';
import { FEATURED_WORKS } from '@/lib/constants';

export default function FeaturedWorks() {
  return (
    <section id="featured-works" className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-full">
                <BookOpen className="h-6 w-6 text-coffee-700 dark:text-coffee-400" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Featured Works
            </h2>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg">
              Discover the stories that have touched hearts and sparked conversations.
            </p>
          </div>

          {/* Books grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_WORKS.map((book) => (
              <Card key={book.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200 border-coffee-200 dark:border-coffee-700">
                <CardHeader className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Simple book cover placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-coffee-700 dark:to-coffee-600">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center p-6">
                          <BookOpen className="h-12 w-12 text-coffee-600 dark:text-coffee-300 mx-auto mb-3" />
                          <h3 className="font-serif font-bold text-coffee-800 dark:text-cream-200 text-lg leading-tight">
                            {book.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="text-sm text-coffee-500 dark:text-cream-500">
                      {book.year} • {book.type}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-coffee-900 dark:text-cream-100 text-xl mb-3">
                    {book.title}
                  </h3>
                  
                  <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  {book.status === 'Published' ? (
                    <Button asChild size="sm" className="btn-primary w-full">
                      <a href={book.links.amazon} target="_blank" rel="noopener noreferrer">
                        Available on Amazon
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm" className="btn-outline w-full">
                      <a href={book.links.goodreads} target="_blank" rel="noopener noreferrer">
                        Coming Soon
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Simple call to action */}
          <div className="text-center mt-12">
            <p className="text-coffee-600 dark:text-cream-400 mb-4">
              Want to stay updated on upcoming releases?
            </p>
            <Button asChild className="btn-secondary">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 