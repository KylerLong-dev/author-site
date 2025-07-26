import { Suspense } from 'react';
import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import AboutSummary from '@/components/sections/AboutSummary';
import FeaturedWorks from '@/components/sections/FeaturedWorks';
import RecentPosts from '@/components/sections/RecentPosts';
import ContactCTA from '@/components/sections/ContactCTA';
import { getRecentPosts, getPage } from '@/lib/ghost';
import { REVALIDATION, DEFAULT_META, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
  openGraph: {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    url: SITE_CONFIG.url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
  },
};

// Enable ISR (Incremental Static Regeneration)
export const revalidate = REVALIDATION.pages;

async function HomePage() {
  // Fetch data in parallel for better performance
  const [recentPosts, aboutPage] = await Promise.all([
    getRecentPosts(6).catch(() => []), // Fallback to empty array if Ghost CMS is not available
    getPage('about').catch(() => null), // Fallback to null if about page is not available
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Summary Section */}
      <AboutSummary aboutContent={aboutPage as any} />

      {/* Featured Works Section */}
      <FeaturedWorks />

      {/* Recent Blog Posts Section */}
      <RecentPosts posts={recentPosts as any} />

      {/* Contact CTA Section */}
      <ContactCTA />
    </div>
  );
}

// Loading component for Suspense boundary
function HomePageSkeleton() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSummary />
      <FeaturedWorks />
      <RecentPosts isLoading={true} />
      <ContactCTA />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
