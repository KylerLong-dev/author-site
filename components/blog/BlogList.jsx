'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Grid, List, ArrowLeft, ArrowRight } from 'lucide-react';
import BlogCard from './BlogCard';

export default function BlogList({ 
  posts = [], 
  tags = [], 
  meta = null, 
  currentPage = 1,
  isLoading = false 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === '' || 
      (post.tags && post.tags.some(tag => tag.slug === selectedTag));
    
    return matchesSearch && matchesTag;
  });

  if (isLoading) {
    return <BlogListSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500 dark:text-cream-500" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input"
            />
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-coffee-600 dark:text-cream-400" />
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === '' ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  selectedTag === '' 
                    ? 'bg-coffee-700 text-cream-100 hover:bg-coffee-800' 
                    : 'border-coffee-300 dark:border-coffee-600 text-coffee-600 dark:text-cream-400 hover:bg-coffee-100 dark:hover:bg-coffee-800'
                }`}
                onClick={() => setSelectedTag('')}
              >
                All
              </Badge>
              {tags.slice(0, 5).map((tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedTag === tag.slug ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedTag === tag.slug 
                      ? 'bg-coffee-700 text-cream-100 hover:bg-coffee-800' 
                      : 'border-coffee-300 dark:border-coffee-600 text-coffee-600 dark:text-cream-400 hover:bg-coffee-100 dark:hover:bg-coffee-800'
                  }`}
                  onClick={() => setSelectedTag(tag.slug)}
                >
                  {tag.name} ({tag.count?.posts || 0})
                </Badge>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn-primary' : 'btn-outline'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active filters display */}
        {(searchQuery || selectedTag) && (
          <div className="mt-4 pt-4 border-t border-coffee-200 dark:border-coffee-700">
            <div className="flex items-center gap-2 text-sm text-coffee-600 dark:text-cream-400">
              <span>Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedTag && (
                <Badge variant="secondary" className="bg-sage-100 dark:bg-sage-900/30 text-sage-800 dark:text-sage-300">
                  Tag: {tags.find(t => t.slug === selectedTag)?.name}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('');
                }}
                className="text-coffee-500 hover:text-coffee-700 dark:text-cream-500 dark:hover:text-cream-300"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-coffee-600 dark:text-cream-400">
          {filteredPosts.length === 0 ? 'No posts found' : 
           filteredPosts.length === 1 ? '1 post found' :
           `${filteredPosts.length} posts found`}
        </p>
        
        {meta && meta.pagination && (
          <p className="text-sm text-coffee-500 dark:text-cream-500">
            Page {meta.pagination.page} of {meta.pagination.pages}
          </p>
        )}
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
        }>
          {filteredPosts.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              size={viewMode === 'list' ? 'large' : 'default'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-8 bg-coffee-50 dark:bg-coffee-900/20 rounded-2xl max-w-md mx-auto">
            <Search className="h-12 w-12 text-coffee-400 dark:text-coffee-500 mx-auto mb-4" />
            <h3 className="text-coffee-800 dark:text-cream-200 font-serif font-semibold text-lg mb-2">
              No posts found
            </h3>
            <p className="text-coffee-600 dark:text-cream-400 text-sm mb-4">
              Try adjusting your search terms or clearing the filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
              }}
              className="btn-outline"
            >
              Clear filters
            </Button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.pagination && meta.pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {meta.pagination.prev && (
            <Button asChild variant="outline" className="btn-outline">
              <Link href={`/blog?page=${meta.pagination.prev}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
          )}
          
          <div className="flex items-center gap-1">
            {Array.from({ length: meta.pagination.pages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                asChild
                variant={pageNum === meta.pagination.page ? 'default' : 'outline'}
                size="sm"
                className={pageNum === meta.pagination.page ? 'btn-primary' : 'btn-outline'}
              >
                <Link href={`/blog?page=${pageNum}`}>
                  {pageNum}
                </Link>
              </Button>
            ))}
          </div>

          {meta.pagination.next && (
            <Button asChild variant="outline" className="btn-outline">
              <Link href={`/blog?page=${meta.pagination.next}`}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search bar skeleton */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Results count skeleton */}
      <Skeleton className="h-5 w-32" />

      {/* Posts grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="border border-coffee-200 dark:border-coffee-700 rounded-xl overflow-hidden">
            <Skeleton className="aspect-[16/10] w-full" />
            <div className="p-6 space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 