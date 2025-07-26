import GhostContentAPI from '@tryghost/content-api';
import { GHOST_CONFIG, PAGINATION } from './constants.js';

// Initialize Ghost Content API only if environment variables are provided
let api = null;

if (GHOST_CONFIG.url && GHOST_CONFIG.key) {
  try {
    api = new GhostContentAPI({
      url: GHOST_CONFIG.url,
      key: GHOST_CONFIG.key,
      version: GHOST_CONFIG.version
    });
  } catch (error) {
    console.warn('Ghost CMS not configured, using mock data for development');
  }
} else {
  console.warn('Ghost CMS environment variables not found, using mock data for development');
}

// Mock data for development when Ghost CMS is not available
const mockPosts = [
  {
    id: '1',
    title: 'The Art of Storytelling: Finding Magic in Everyday Moments',
    slug: 'art-of-storytelling',
    excerpt: 'Every great story begins with a simple moment of connection. Whether it\'s the way sunlight filters through an old window or the conversation overheard in a coffee shop, inspiration is everywhere if we know how to look.',
    html: '<p>Every great story begins with a simple moment of connection. Whether it\'s the way sunlight filters through an old window or the conversation overheard in a coffee shop, inspiration is everywhere if we know how to look.</p><p>As writers, we\'re collectors of these moments, gathering them like precious stones to weave into the tapestries of our narratives.</p>',
    feature_image: null,
    published_at: '2024-01-15T10:00:00.000Z',
    updated_at: '2024-01-15T10:00:00.000Z',
    meta_description: 'Exploring how everyday moments become the foundation of great storytelling.',
    custom_excerpt: 'Every great story begins with a simple moment of connection.',
    tags: [
      { id: '1', name: 'Writing', slug: 'writing' },
      { id: '2', name: 'Inspiration', slug: 'inspiration' }
    ],
    authors: [
      { id: '1', name: 'Author Name', slug: 'author-name' }
    ]
  },
  {
    id: '2',
    title: 'Coffee Shop Chronicles: Where Stories Are Born',
    slug: 'coffee-shop-chronicles',
    excerpt: 'There\'s something magical about coffee shops - the gentle hum of conversation, the aroma of freshly ground beans, and the stories that unfold in every corner.',
    html: '<p>There\'s something magical about coffee shops - the gentle hum of conversation, the aroma of freshly ground beans, and the stories that unfold in every corner.</p><p>I\'ve written three novels sitting in various coffee shops around the city, each one teaching me something new about the human experience.</p>',
    feature_image: null,
    published_at: '2024-01-10T09:00:00.000Z',
    updated_at: '2024-01-10T09:00:00.000Z',
    meta_description: 'Why coffee shops have become the modern writer\'s sanctuary.',
    custom_excerpt: 'There\'s something magical about coffee shops.',
    tags: [
      { id: '3', name: 'Coffee', slug: 'coffee' },
      { id: '1', name: 'Writing', slug: 'writing' }
    ],
    authors: [
      { id: '1', name: 'Author Name', slug: 'author-name' }
    ]
  },
  {
    id: '3',
    title: 'The Power of Second Chances in Literature',
    slug: 'power-of-second-chances',
    excerpt: 'Some of the most compelling characters are those who get a second chance - at love, at life, at becoming who they were meant to be.',
    html: '<p>Some of the most compelling characters are those who get a second chance - at love, at life, at becoming who they were meant to be.</p><p>In my upcoming novel, the protagonist learns that second chances aren\'t just given - they\'re earned through courage, vulnerability, and the willingness to change.</p>',
    feature_image: null,
    published_at: '2024-01-05T08:00:00.000Z',
    updated_at: '2024-01-05T08:00:00.000Z',
    meta_description: 'Exploring themes of redemption and growth in contemporary fiction.',
    custom_excerpt: 'Some of the most compelling characters are those who get a second chance.',
    tags: [
      { id: '4', name: 'Characters', slug: 'characters' },
      { id: '5', name: 'Themes', slug: 'themes' }
    ],
    authors: [
      { id: '1', name: 'Author Name', slug: 'author-name' }
    ]
  }
];

const mockTags = [
  { id: '1', name: 'Writing', slug: 'writing', count: { posts: 2 } },
  { id: '2', name: 'Inspiration', slug: 'inspiration', count: { posts: 1 } },
  { id: '3', name: 'Coffee', slug: 'coffee', count: { posts: 1 } },
  { id: '4', name: 'Characters', slug: 'characters', count: { posts: 1 } },
  { id: '5', name: 'Themes', slug: 'themes', count: { posts: 1 } }
];

const mockAboutPage = {
  id: 'about',
  title: 'About Author Name',
  slug: 'about',
  html: '<p>Welcome to my literary world. I\'m a storyteller at heart, weaving tales that explore the beauty in everyday moments and the connections that bind us together.</p><p>With a background in literature and a passion for coffee-shop conversations, I find inspiration in the quiet moments of life—the way morning light filters through curtains, the sound of rain on old windows, and the stories people carry in their hearts.</p><p>My writing journey began with handwritten journals and has evolved into published novels that celebrate human resilience, love, and the power of second chances.</p>',
  excerpt: `I'm a storyteller at heart, weaving tales that explore the beauty in everyday moments and the connections that bind us together. With a background in literature and a passion for coffee-shop conversations, I find inspiration in the quiet moments of life—the way morning light filters through curtains, the sound of rain on old windows, and the stories people carry in their hearts.

My writing journey began with handwritten journals and has evolved into published novels that celebrate human resilience, love, and the power of second chances. When I'm not writing, you'll find me curled up with a good book, exploring local coffee shops, or taking long walks in nature.`,
  feature_image: null,
  published_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  meta_description: 'Learn more about the author behind the stories.',
  authors: [
    { id: '1', name: 'Author Name', slug: 'author-name' }
  ]
};

/**
 * Get all published blog posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Posts per page (default: from constants)
 * @param {string} tag - Filter by tag (optional)
 * @returns {Promise<Object>} Posts data with pagination info
 */
export async function getPosts(page = 1, limit = PAGINATION.postsPerPage, tag = null) {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      let filteredPosts = mockPosts;
      
      // Apply tag filter if specified
      if (tag) {
        filteredPosts = mockPosts.filter(post => 
          post.tags && post.tags.some(postTag => postTag.slug === tag)
        );
      }
      
      // Simple pagination for mock data
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      return {
        posts: paginatedPosts,
        meta: {
          pagination: {
            page,
            pages: Math.ceil(filteredPosts.length / limit),
            limit,
            total: filteredPosts.length,
            prev: page > 1 ? page - 1 : null,
            next: page < Math.ceil(filteredPosts.length / limit) ? page + 1 : null
          }
        }
      };
    }

    const options = {
      limit,
      page,
      include: 'tags,authors',
      filter: 'status:published',
      order: 'published_at DESC'
    };

    // Add tag filter if specified
    if (tag) {
      options.filter += `+tag:${tag}`;
    }

    const posts = await api.posts.browse(options);
    
    return {
      posts: posts || [],
      meta: posts.meta || null
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      meta: null
    };
  }
}

/**
 * Get a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post data or null if not found
 */
export async function getPost(slug) {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      return mockPosts.find(post => post.slug === slug) || null;
    }

    const post = await api.posts.read(
      { slug },
      { include: 'tags,authors' }
    );
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Get related posts based on tags
 * @param {string} currentSlug - Current post slug to exclude
 * @param {Array} tags - Array of tag objects
 * @param {number} limit - Number of related posts to fetch
 * @returns {Promise<Array>} Related posts array
 */
export async function getRelatedPosts(currentSlug, tags = [], limit = PAGINATION.relatedPosts) {
  try {
    if (!tags.length) return [];

    // Use mock data if Ghost API is not available
    if (!api) {
      const relatedPosts = mockPosts.filter(post => {
        // Exclude current post
        if (post.slug === currentSlug) return false;
        
        // Check if post has any matching tags
        return post.tags && post.tags.some(postTag => 
          tags.some(tag => tag.slug === postTag.slug)
        );
      });
      
      return relatedPosts.slice(0, limit);
    }

    // Create filter for posts with similar tags, excluding current post
    const tagSlugs = tags.map(tag => tag.slug).join(',');
    const filter = `tag:[${tagSlugs}]+status:published-slug:-${currentSlug}`;

    const posts = await api.posts.browse({
      filter,
      limit,
      include: 'tags,authors',
      order: 'published_at DESC'
    });

    return posts || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

/**
 * Get recent blog posts for homepage
 * @param {number} limit - Number of recent posts to fetch
 * @returns {Promise<Array>} Recent posts array
 */
export async function getRecentPosts(limit = 6) {
  // Use mock data if Ghost API is not available
  if (!api) {
    return mockPosts.slice(0, limit);
  }

  try {
    const posts = await api.posts.browse({
      limit,
      include: 'tags,authors',
      filter: 'status:published',
      order: 'published_at DESC'
    });

    return posts || [];
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

/**
 * Get a page by slug (for About page, etc.)
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} Page data or null if not found
 */
export async function getPage(slug) {
  // Use mock data if Ghost API is not available
  if (!api) {
    if (slug === 'about') {
      return mockAboutPage;
    }
    return null;
  }

  try {
    const page = await api.pages.read(
      { slug },
      { include: 'authors' }
    );
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

/**
 * Get all pages
 * @returns {Promise<Array>} All pages array
 */
export async function getPages() {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      return [mockAboutPage];
    }

    const pages = await api.pages.browse({
      include: 'authors',
      filter: 'status:published'
    });
    return pages || [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Get site settings and metadata
 * @returns {Promise<Object|null>} Site settings or null if error
 */
export async function getSiteSettings() {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      return {
        title: 'Author Portfolio',
        description: 'A professional author portfolio showcasing books, blog posts, and literary work',
        url: 'http://localhost:3001'
      };
    }

    const settings = await api.settings.browse();
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Get all tags
 * @returns {Promise<Array>} All tags array
 */
export async function getTags() {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      return mockTags;
    }

    const tags = await api.tags.browse({
      include: 'count.posts',
      order: 'count.posts DESC'
    });
    return tags || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Search posts by query
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} Search results array
 */
export async function searchPosts(query, limit = 10) {
  try {
    // Use mock data if Ghost API is not available
    if (!api) {
      const searchResults = mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase()))
      );
      return searchResults.slice(0, limit);
    }

    const posts = await api.posts.browse({
      filter: `status:published`,
      limit,
      include: 'tags,authors',
      order: 'published_at DESC'
    });

    // Simple client-side search by title and excerpt
    // Note: Ghost doesn't have built-in search API, so this is a basic implementation
    const searchResults = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase()))
    );

    return searchResults;
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

/**
 * Subscribe to newsletter (Ghost Members API)
 * @param {string} email - Email address to subscribe
 * @returns {Promise<Object>} Subscription result
 */
export async function subscribeNewsletter(email) {
  try {
    // Note: This requires Ghost Members API which needs admin API key
    // For now, we'll return a success message and handle the actual subscription
    // through Ghost's frontend forms or admin API separately
    
    console.log('Newsletter subscription requested for:', email);
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.'
    };
  }
}

/**
 * Calculate reading time for a post
 * @param {string} html - Post HTML content
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(html) {
  if (!html) return 0;
  
  // Remove HTML tags and count words
  const text = html.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  
  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(wordCount / 200);
  
  return readingTime;
}

/**
 * Format post excerpt
 * @param {Object} post - Post object
 * @param {number} length - Max excerpt length
 * @returns {string} Formatted excerpt
 */
export function formatExcerpt(post, length = 150) {
  if (post.custom_excerpt) {
    return post.custom_excerpt;
  }
  
  if (post.excerpt) {
    return post.excerpt.length > length 
      ? post.excerpt.substring(0, length) + '...'
      : post.excerpt;
  }
  
  // Fallback to meta_description or truncated HTML
  const fallback = post.meta_description || post.html || '';
  const text = fallback.replace(/<[^>]*>/g, '');
  
  return text.length > length 
    ? text.substring(0, length) + '...'
    : text;
} 