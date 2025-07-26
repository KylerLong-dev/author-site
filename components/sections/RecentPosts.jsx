import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Clock, Calendar, PenTool, User } from 'lucide-react';
import { calculateReadingTime, formatExcerpt } from '@/lib/ghost';

export default function RecentPosts({ posts = [], isLoading = false }) {
  if (isLoading) {
    return <RecentPostsSkeleton />;
  }

  return (
    <section className="py-16 lg:py-24 bg-sage-50 dark:bg-sage-900/20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <PenTool className="h-6 w-6 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Recent Blog Posts
            </h2>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg">
              Insights from the writing journey, book reflections, and stories behind the stories.
            </p>
          </div>

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PenTool className="h-12 w-12 text-coffee-400 dark:text-coffee-600 mx-auto mb-4" />
              <p className="text-coffee-600 dark:text-cream-400">
                No blog posts available at the moment.
              </p>
            </div>
          )}

          {/* View all posts CTA */}
          {posts.length > 0 && (
            <div className="text-center mt-12">
              <Button asChild className="btn-outline">
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogPostCard({ post }) {
  const publishedDate = format(new Date(post.published_at), 'MMM dd, yyyy');
  const excerpt = formatExcerpt(post, 120);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 border-coffee-200 dark:border-coffee-700 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Simple placeholder for posts without featured images
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-coffee-700 dark:to-coffee-600">
              <div className="flex items-center justify-center h-full">
                <PenTool className="h-8 w-8 text-coffee-600 dark:text-coffee-300" />
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Publication date */}
        <div className="mb-3">
          <span className="text-sm text-coffee-500 dark:text-cream-500">
            {publishedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-coffee-900 dark:text-cream-100 text-xl mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild variant="ghost" className="w-full group hover:bg-coffee-100 dark:hover:bg-coffee-800">
          <Link href={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function RecentPostsSkeleton() {
  return (
    <section className="section-padding bg-sage-50 dark:bg-sage-900/20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <PenTool className="h-6 w-6 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
            <h2 className="text-display-lg font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Recent Blog Posts
            </h2>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg">
              Insights from the writing journey, book reflections, and stories behind the stories.
            </p>
          </div>

          {/* Loading skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-coffee-200 dark:border-coffee-700">
                <CardHeader className="p-0">
                  <Skeleton className="aspect-[16/10] w-full" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 