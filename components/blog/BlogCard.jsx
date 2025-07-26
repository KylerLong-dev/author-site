import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, PenTool, User } from 'lucide-react';
import { calculateReadingTime, formatExcerpt } from '@/lib/ghost';

export default function BlogCard({ post, showExcerpt = true, size = 'default' }) {
  const readingTime = calculateReadingTime(post.html);
  const excerpt = formatExcerpt(post, size === 'large' ? 150 : 120);
  const publishedDate = format(new Date(post.published_at), 'MMM dd, yyyy');

  const cardClasses = size === 'large' 
    ? "group overflow-hidden hover:shadow-xl transition-all duration-300 border-coffee-200 dark:border-coffee-700 h-full flex flex-col lg:flex-row"
    : "group overflow-hidden hover:shadow-xl transition-all duration-300 border-coffee-200 dark:border-coffee-700 h-full flex flex-col";

  const imageClasses = size === 'large'
    ? "relative aspect-[16/10] lg:aspect-[4/3] lg:w-2/5 overflow-hidden"
    : "relative aspect-[16/10] overflow-hidden";

  return (
    <Card className={cardClasses}>
      <CardHeader className="p-0">
        <div className={imageClasses}>
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Placeholder for posts without featured images
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-200 via-amber-100 to-sage-200 
                            dark:from-coffee-700 dark:via-amber-800 dark:to-sage-700">
              <div className="flex items-center justify-center h-full">
                                 <PenTool className={`${size === 'large' ? 'h-16 w-16' : 'h-12 w-12'} text-coffee-600 dark:text-coffee-300`} />
              </div>
            </div>
          )}
          
          {/* Reading time overlay */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-coffee-900/80 text-cream-100 backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {readingTime} min read
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`${size === 'large' ? 'lg:w-3/5' : ''} p-6 flex-1 flex flex-col`}>
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, size === 'large' ? 3 : 2).map((tag) => (
              <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
                <Badge 
                  variant="outline" 
                  className="text-xs border-coffee-300 dark:border-coffee-600 text-coffee-600 dark:text-cream-400
                           hover:bg-coffee-100 dark:hover:bg-coffee-800 transition-colors cursor-pointer"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className={`font-serif font-bold text-coffee-900 dark:text-cream-100 mb-3 
                         group-hover:text-coffee-700 dark:group-hover:text-cream-200 transition-colors 
                         line-clamp-2 cursor-pointer ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {showExcerpt && (
          <p className={`text-coffee-600 dark:text-cream-400 leading-relaxed mb-4 flex-1 
                        ${size === 'large' ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>
            {excerpt}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-coffee-500 dark:text-cream-500 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{publishedDate}</span>
          </div>
          
          {post.authors && post.authors[0] && (
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>{post.authors[0].name}</span>
            </div>
          )}
        </div>

        {/* Read more button */}
        <Button asChild variant="ghost" className="w-full group hover:bg-coffee-100 dark:hover:bg-coffee-800 mt-auto">
          <Link href={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Compact version for sidebars or related posts
export function BlogCardCompact({ post }) {
  const publishedDate = format(new Date(post.published_at), 'MMM dd');
  const readingTime = calculateReadingTime(post.html);

  return (
    <div className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex gap-4 p-4 rounded-lg hover:bg-coffee-50 dark:hover:bg-coffee-900/30 transition-colors">
          {/* Small image */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-coffee-200 to-sage-200 
                              dark:from-coffee-700 dark:to-sage-700 flex items-center justify-center">
                <PenTool className="h-6 w-6 text-coffee-600 dark:text-coffee-300" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-coffee-900 dark:text-cream-100 text-sm 
                          line-clamp-2 group-hover:text-coffee-700 dark:group-hover:text-cream-200 transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs text-coffee-500 dark:text-cream-500">
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 