import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react';
import { BlogCardCompact } from '@/components/blog/BlogCard';
import { getPost, getRelatedPosts } from '@/lib/ghost';
import { calculateReadingTime } from '@/lib/ghost';
import { REVALIDATION, SITE_CONFIG } from '@/lib/constants';

// Enable ISR (Incremental Static Regeneration)
export const revalidate = REVALIDATION.posts;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null) as any;

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.meta_description || post.excerpt || post.title,
    keywords: post.tags?.map((tag: any) => tag.name).join(', '),
    authors: post.authors?.map((author: any) => ({ name: author.name })),
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt || post.title,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: post.feature_image ? [post.feature_image] : [],
      authors: post.authors?.map((author: any) => author.name),
      tags: post.tags?.map((tag: any) => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt || post.title,
      images: post.feature_image ? [post.feature_image] : [],
      creator: post.authors?.[0]?.twitter ? `@${post.authors[0].twitter}` : undefined,
    },
  };
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug).catch(() => null) as any;

  if (!post) {
    notFound();
  }

  const [relatedPosts] = await Promise.all([
    getRelatedPosts(post.slug, post.tags || [], 3).catch(() => []),
  ]);

  const readingTime = calculateReadingTime(post.html);
  const publishedDate = format(new Date(post.published_at), 'MMMM dd, yyyy');

  return (
    <article className="bg-background">
      {/* Hero section */}
      <div className="relative">
        {post.feature_image && (
          <div className="relative h-96 lg:h-[500px] overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-coffee-900/20 to-transparent" />
          </div>
        )}
        
        {/* Content overlay */}
        <div className={`${post.feature_image ? 'absolute bottom-0 left-0 right-0' : 'relative'} section-padding`}>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              
              {/* Back button */}
              <div className="mb-8">
                <Button asChild variant="ghost" className={`${post.feature_image ? 'text-cream-100 hover:bg-cream-100/20' : ''} btn-outline`}>
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                                     {post.tags.map((tag: any) => (
                    <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                      <Badge 
                        variant="secondary" 
                        className={`${post.feature_image ? 'bg-cream-100/20 text-cream-100 hover:bg-cream-100/30' : 'bg-coffee-100 dark:bg-coffee-800 text-coffee-800 dark:text-cream-200'} cursor-pointer transition-colors`}
                      >
                        {tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className={`text-display-xl lg:text-display-2xl font-serif font-bold mb-6 leading-tight ${
                post.feature_image ? 'text-cream-100' : 'text-coffee-900 dark:text-cream-100'
              }`}>
                {post.title}
              </h1>

              {/* Meta information */}
              <div className={`flex flex-wrap items-center gap-4 text-sm ${
                post.feature_image ? 'text-cream-200' : 'text-coffee-600 dark:text-cream-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{publishedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
                {post.authors && post.authors[0] && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {post.authors[0].name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            
            {/* Post excerpt */}
            {post.custom_excerpt && (
              <div className="mb-8">
                <p className="text-xl text-coffee-600 dark:text-cream-300 leading-relaxed italic border-l-4 border-amber-400 pl-6">
                  {post.custom_excerpt}
                </p>
              </div>
            )}

            {/* Main content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-coffee-200 dark:border-coffee-700">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-coffee-600 dark:text-cream-400" />
                  <span className="text-coffee-600 dark:text-cream-400 font-medium">Share this post:</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button asChild variant="outline" size="sm" className="btn-outline">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="btn-outline">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="btn-outline">
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {(relatedPosts as any).length > 0 && (
        <div className="section-padding bg-sage-50 dark:bg-sage-900/20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-6 w-6 text-sage-700 dark:text-sage-400" />
                <h2 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100">
                  Related Posts
                </h2>
              </div>
              
              <div className="space-y-4">
                {(relatedPosts as any).map((relatedPost: any) => (
                  <BlogCardCompact key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button asChild variant="outline" className="btn-outline">
                  <Link href="/blog">
                    View All Posts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="section-padding bg-amber-50 dark:bg-amber-900/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Enjoyed this post?
            </h3>
            <p className="text-coffee-600 dark:text-cream-300 mb-6">
              Subscribe to get notified when I publish new stories and insights.
            </p>
            <Button asChild className="btn-primary">
              <Link href="/#newsletter">
                Subscribe to Newsletter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <article className="bg-background">
      {/* Hero skeleton */}
      <div className="relative">
        <Skeleton className="h-96 lg:h-[500px] w-full" />
        <div className="absolute bottom-0 left-0 right-0 section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-16 w-full mb-6" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
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
    </article>
  );
}

export default function BlogPostPage(props: BlogPostPageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent {...props} />
    </Suspense>
  );
} 