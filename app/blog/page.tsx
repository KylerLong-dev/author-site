import { Suspense } from 'react';
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { getPosts, getTags } from '@/lib/ghost';
import { REVALIDATION, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights from the writing journey, book reflections, and stories behind the stories.',
  openGraph: {
    title: `Blog | ${SITE_CONFIG.author}`,
    description: 'Insights from the writing journey, book reflections, and stories behind the stories.',
    url: `${SITE_CONFIG.url}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${SITE_CONFIG.author}`,
    description: 'Insights from the writing journey, book reflections, and stories behind the stories.',
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = REVALIDATION.posts;

interface BlogPageProps {
  searchParams: {
    page?: string;
    tag?: string;
  };
}

async function BlogPageContent({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const tag = searchParams.tag;

  // Fetch data in parallel for better performance
  const [postsData, tags] = await Promise.all([
    getPosts(page, 9, tag).catch(() => ({ posts: [], meta: null })), // 9 posts per page
    getTags().catch(() => []),
  ]);

  return (
    <div className="section-padding bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          {/* Page header */}
          <div className="text-center mb-16">
            <h1 className="text-display-lg font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Blog
            </h1>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg">
              Welcome to my corner of the internet where I share insights from the writing journey, 
              reflections on books that have shaped me, and the stories behind the stories.
            </p>
            
            {tag && (
              <div className="mt-6">
                <p className="text-coffee-500 dark:text-cream-500 text-sm">
                  Showing posts tagged with "{tag}"
                </p>
              </div>
            )}
          </div>

          {/* Blog list */}
          <BlogList 
            posts={(postsData as any).posts}
            tags={tags as any}
            meta={(postsData as any).meta}
            currentPage={page}
          />

          {/* Additional content for empty states or featured content */}
          {(postsData as any).posts.length === 0 && (
            <div className="mt-16 text-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8 max-w-md mx-auto border border-amber-200 dark:border-amber-800">
                <h3 className="text-coffee-800 dark:text-cream-200 font-serif font-semibold text-lg mb-2">
                  Coming Soon
                </h3>
                <p className="text-coffee-600 dark:text-cream-400 text-sm mb-4">
                  I'm working on some exciting content for you. Check back soon for new posts 
                  about writing, books, and the creative process.
                </p>
                <p className="text-coffee-500 dark:text-cream-500 text-xs">
                  In the meantime, feel free to{' '}
                  <a href="/contact" className="text-coffee-700 dark:text-amber-400 hover:underline">
                    reach out
                  </a>{' '}
                  if you have any questions or suggestions for topics you'd like me to cover.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogPageSkeleton() {
  return (
    <div className="section-padding bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-16">
            <h1 className="text-display-lg font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Blog
            </h1>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg">
              Welcome to my corner of the internet where I share insights from the writing journey, 
              reflections on books that have shaped me, and the stories behind the stories.
            </p>
          </div>

          {/* Loading state */}
          <BlogList isLoading={true} />
        </div>
      </div>
    </div>
  );
}

export default function BlogPage(props: BlogPageProps) {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageContent {...props} />
    </Suspense>
  );
} 