import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { User, BookOpen, Coffee, Mail, Heart } from 'lucide-react';
import { getPage } from '@/lib/ghost';
import { REVALIDATION, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${SITE_CONFIG.author}, the stories behind the stories, and the journey that led to becoming an author.`,
  openGraph: {
    title: `About | ${SITE_CONFIG.author}`,
    description: `Learn more about ${SITE_CONFIG.author}, the stories behind the stories, and the journey that led to becoming an author.`,
    url: `${SITE_CONFIG.url}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About | ${SITE_CONFIG.author}`,
    description: `Learn more about ${SITE_CONFIG.author}, the stories behind the stories, and the journey that led to becoming an author.`,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = REVALIDATION.pages;

async function AboutPageContent() {
  const aboutPage = await getPage('about').catch(() => null) as any;

  // Default content if Ghost CMS page is not available
  const defaultContent = {
    title: `About ${SITE_CONFIG.author}`,
    html: `
      <p>Welcome to my literary world. I'm a storyteller at heart, weaving tales that explore the beauty in everyday moments and the connections that bind us together.</p>
      
      <p>With a background in literature and a passion for coffee-shop conversations, I find inspiration in the quiet moments of life—the way morning light filters through curtains, the sound of rain on old windows, and the stories people carry in their hearts.</p>
      
      <p>My writing journey began with handwritten journals and has evolved into published novels that celebrate human resilience, love, and the power of second chances. Each story I write is an invitation to pause, reflect, and remember that even in our busiest lives, there's magic in the ordinary.</p>
      
      <p>When I'm not writing, you'll find me curled up with a good book, exploring local coffee shops, or taking long walks in nature. I believe that the best stories come from lived experiences, meaningful connections, and the courage to be vulnerable on the page.</p>
      
      <p>Thank you for joining me on this journey. Whether you're here for the first time or you've been following my work for years, I'm grateful to have you as part of this community of readers and dreamers.</p>
    `,
    feature_image: '/images/author-photo.jpg',
  };

  const content = aboutPage || defaultContent;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 
                      dark:from-coffee-950 dark:via-coffee-900 dark:to-coffee-800">
        <div className="section-padding">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Content */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="h-8 w-8 text-coffee-700 dark:text-amber-400" />
                    <h1 className="text-display-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                      {content.title}
                    </h1>
                  </div>
                  
                  <p className="text-xl text-coffee-600 dark:text-cream-300 leading-relaxed mb-8">
                    Welcome to my literary world. I'm a storyteller who believes in the power of words 
                    to heal, inspire, and connect us all.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="btn-primary">
                      <Link href="/contact">
                        <Mail className="mr-2 h-5 w-5" />
                        Get in Touch
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="btn-outline">
                      <Link href="/blog">
                        Read My Blog
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Author Photo */}
                <div className="order-1 lg:order-2">
                  <div className="relative max-w-md mx-auto">
                    {/* Background decoration */}
                    <div className="absolute -inset-6 bg-gradient-to-br from-amber-200 to-sage-200 
                                    dark:from-amber-800 dark:to-sage-800 rounded-3xl opacity-20 
                                    transform rotate-3"></div>
                    
                    <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl border border-border">
                      <div className="aspect-[4/5] relative">
                        {content.feature_image ? (
                          <Image
                            src={content.feature_image}
                            alt={SITE_CONFIG.author}
                            fill
                            className="object-cover"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-coffee-200 via-amber-100 to-sage-200 
                                          dark:from-coffee-700 dark:via-amber-800 dark:to-sage-700 
                                          flex items-center justify-center">
                            <User className="h-24 w-24 text-coffee-500 dark:text-coffee-400" />
                          </div>
                        )}
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

                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 text-amber-300 dark:text-amber-600 opacity-60">
                      <Coffee className="h-12 w-12 transform rotate-12" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 text-sage-300 dark:text-sage-600 opacity-60">
                      <BookOpen className="h-10 w-10 transform -rotate-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            
            {/* Story Content */}
            <div 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />

            <Separator className="my-12 bg-coffee-200 dark:bg-coffee-700" />

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              
              {/* Writing Journey */}
              <Card className="border-coffee-200 dark:border-coffee-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-coffee-700 dark:text-amber-400" />
                    <h3 className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                      My Writing Journey
                    </h3>
                  </div>
                  <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed mb-6">
                    From handwritten journals to published novels, every story has been a step 
                    in discovering not just who I am as a writer, but who I am as a person.
                  </p>
                  <ul className="space-y-2 text-sm text-coffee-600 dark:text-cream-400">
                    <li>• Started writing at age 12</li>
                    <li>• First novel published in 2022</li>
                    <li>• Featured in literary magazines</li>
                    <li>• Active in local writing community</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Philosophy */}
              <Card className="border-coffee-200 dark:border-coffee-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-coffee-700 dark:text-amber-400" />
                    <h3 className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                      Writing Philosophy
                    </h3>
                  </div>
                  <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed mb-6">
                    I believe stories have the power to change us, one page at a time. 
                    Every character, every scene, is an opportunity to explore what it means to be human.
                  </p>
                  <blockquote className="border-l-4 border-amber-400 pl-4 italic text-coffee-700 dark:text-cream-300">
                    "The best stories are the ones that make us feel less alone in the world."
                  </blockquote>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                <h3 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
                  Let's Connect
                </h3>
                <p className="text-coffee-600 dark:text-cream-300 mb-6 max-w-2xl mx-auto">
                  I love hearing from readers, fellow writers, and anyone who believes in the magic of storytelling. 
                  Whether you have questions about my books, want to discuss a collaboration, or just want to say hello, 
                  I'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="btn-primary">
                    <Link href="/contact">
                      Start a Conversation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="btn-outline">
                    <Link href="/#newsletter">
                      Join Newsletter
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPageSkeleton() {
  return (
    <div className="bg-background">
      {/* Hero skeleton */}
      <div className="section-padding bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Skeleton className="aspect-[4/5] w-full max-w-md mx-auto rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutPageSkeleton />}>
      <AboutPageContent />
    </Suspense>
  );
} 