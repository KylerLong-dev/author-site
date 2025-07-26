import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, User, Coffee, PenTool } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function AboutSummary({ aboutContent = null }) {
  // Default content if Ghost CMS content is not available
  const defaultContent = {
    title: `About ${SITE_CONFIG.author}`,
    excerpt: `I'm a storyteller at heart, weaving tales that explore the beauty in everyday moments and the connections that bind us together. With a background in literature and a passion for coffee-shop conversations, I find inspiration in the quiet moments of life.

My writing journey began with handwritten journals and has evolved into published novels that celebrate human resilience, love, and the power of second chances. When I'm not writing, you'll find me curled up with a good book, exploring local coffee shops, or taking long walks in nature.`,
    featureImage: '/images/author-photo.jpg' // Placeholder
  };

  const content = aboutContent || defaultContent;

  return (
    <section className="py-16 lg:py-24 bg-cream-100 dark:bg-coffee-800">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-sage-100 dark:bg-sage-900/30 rounded-full">
                <User className="h-6 w-6 text-sage-700 dark:text-sage-400" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              {content.title}
            </h2>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto">
              Get to know the person behind the stories
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Author image */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto">
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                  <div className="aspect-[4/5] relative">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage 
                        src={content.featureImage} 
                        alt={SITE_CONFIG.author}
                        className="object-cover"
                      />
                      <AvatarFallback className="w-full h-full rounded-none bg-coffee-100 dark:bg-coffee-700 
                                                 flex items-center justify-center">
                        <User className="h-20 w-20 text-coffee-400 dark:text-coffee-500" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Author details overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                                  from-coffee-900/80 to-transparent p-6">
                    <h3 className="text-cream-100 font-serif font-bold text-xl mb-1">
                      {SITE_CONFIG.author}
                    </h3>
                    <p className="text-cream-300 text-sm">
                      Author & Storyteller
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About content */}
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg max-w-none">
                <div className="text-coffee-700 dark:text-cream-300 leading-relaxed space-y-4">
                  {(content?.excerpt || content?.html || '').split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Stats or highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-coffee-800 dark:text-cream-200">
                    3+
                  </div>
                  <div className="text-sm text-coffee-600 dark:text-cream-400">
                    Books Published
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-coffee-800 dark:text-cream-200">
                    5k+
                  </div>
                  <div className="text-sm text-coffee-600 dark:text-cream-400">
                    Readers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-coffee-800 dark:text-cream-200">
                    ∞
                  </div>
                  <div className="text-sm text-coffee-600 dark:text-cream-400">
                    Stories to Tell
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8 pt-6 border-t border-coffee-200 dark:border-coffee-600">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="btn-primary flex-1">
                    <Link href="/about">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="btn-outline flex-1">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 